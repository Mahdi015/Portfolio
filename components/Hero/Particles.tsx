"use client";

import { useEffect, useRef } from "react";
import styles from "./Particles.module.css";

/* --------------------------------------------------------------------------
   A starfield reads as *space* rather than as dots because of four things:
   parallax depth, colour variation, gas that moves independently of the
   stars, and light that actually bleeds. All four are here; none of them
   need a 3D library.

   Stars draw from pre-rendered sprites — one 64px radial gradient per
   colour, built once — rather than from a fresh arc() per star per frame.
   That buys a real halo, which a flat filled circle can never have, and
   blitting a bitmap costs less than asking the rasteriser for a new path.
   -------------------------------------------------------------------------- */

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  vx: number; // px per second
  vy: number;
  color: string;
  sprite: HTMLCanvasElement;
  twinkles: boolean;
  phase: number;
  speed: number;
  /** Scratch: alpha after twinkle, edge fade and pointer lift, per frame. */
  lum: number;
}

interface Layer {
  stars: Star[];
  /** How far this depth slides with the pointer, in px. */
  mouse: number;
  /** How far it slides with page scroll, as a fraction of scroll distance. */
  scroll: number;
  /** Halo strength. The furthest layer gets none — at that size it's mush. */
  glow: number;
  /** Whether this depth draws constellation lines under the cursor. */
  link: boolean;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  len: number;
}

interface Cloud {
  hue: string;
  x: number;
  y: number;
  r: number;
  ax: number; // drift amplitude
  ay: number;
  sx: number; // drift speed
  sy: number;
  phase: number;
  alpha: number;
}

/** Far-out-of-focus motes — a depth cue the stars alone can't give. */
interface Dust {
  x: number;
  y: number;
  r: number;
  alpha: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
}

/** Real starlight isn't white — the variation is most of the realism. */
const STAR_COLORS = [
  "#FFFFFF",
  "#E8ECFF",
  "#E8ECFF",
  "#C7D8FF",
  "#FFE4CC",
  "#FFD1B0",
];

const CLOUDS: Omit<Cloud, "x" | "y" | "r">[] = [
  { hue: "#6D4FD0", ax: 0.06, ay: 0.04, sx: 0.07, sy: 0.05, phase: 0.0, alpha: 0.5 },
  { hue: "#2E7FD8", ax: 0.08, ay: 0.05, sx: 0.05, sy: 0.08, phase: 1.7, alpha: 0.42 },
  { hue: "#3FC8B4", ax: 0.05, ay: 0.07, sx: 0.09, sy: 0.06, phase: 3.1, alpha: 0.3 },
  { hue: "#B14FD8", ax: 0.07, ay: 0.03, sx: 0.06, sy: 0.09, phase: 4.6, alpha: 0.26 },
];

const LAYER_SPEC = [
  { share: 0.56, rMin: 0.3, rMax: 0.75, aMin: 0.16, aMax: 0.46, mouse: 5, scroll: 0.02, glow: 0, link: false },
  { share: 0.3, rMin: 0.6, rMax: 1.15, aMin: 0.3, aMax: 0.7, mouse: 13, scroll: 0.05, glow: 0.5, link: false },
  { share: 0.14, rMin: 1.0, rMax: 1.9, aMin: 0.45, aMax: 0.95, mouse: 26, scroll: 0.1, glow: 0.9, link: true },
];

/** Sprite resolution. Stars never draw wider than ~24px, so 64 is ample. */
const SPRITE_PX = 64;
/** Halo diameter as a multiple of core radius. */
const HALO_SCALE = 11;
/** How far from the cursor the field responds, in px. */
const POINTER_REACH = 280;
/** Longest constellation line, in px. Trimmed as density rose — the web gets
    busy fast when there are more stars inside every radius. */
const LINK_DIST = 122;
/** Stars fade this far from the field edge so wrapping is never visible. */
const EDGE_FADE = 70;

const withAlpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export default function Particles() {
  const starsRef = useRef<HTMLCanvasElement>(null);
  const cloudRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const starCanvas = starsRef.current;
    const cloudCanvas = cloudRef.current;
    if (!starCanvas || !cloudCanvas) return;

    const starCtx = starCanvas.getContext("2d");
    const cloudCtx = cloudCanvas.getContext("2d");
    if (!starCtx || !cloudCtx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /**
     * Whether there is a cursor to follow. On touch, `pointermove` still fires
     * — a drag to scroll is a pointer move — which flipped `pointerSeen` true
     * and switched on the per-frame pointer glow and parallax easing for an
     * effect that has no cursor behind it. Gate the listener instead.
     */
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let layers: Layer[] = [];
    let clouds: Cloud[] = [];
    let meteors: Meteor[] = [];
    let dust: Dust[] = [];
    let width = 0;
    let height = 0;
    // The field is built larger than the canvas on every side. The deepest
    // layer slides up by a quarter of the viewport at full scroll, so without
    // overscan that would drag an empty band into frame behind the type — and
    // the edge fade further down needs somewhere off-screen to happen.
    let fieldX0 = 0;
    let fieldY0 = 0;
    let fieldX1 = 0;
    let fieldY1 = 0;
    let fieldW = 0;
    let fieldH = 0;
    let frame = 0;
    let running = true;
    let last = 0;
    let elapsed = 0;
    let nextMeteor = 3;

    // Pointer parallax is eased toward its target, never snapped to it.
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    // Cursor in canvas space, parked off-screen until it actually moves so
    // nothing blooms in the centre on load.
    let mouseX = -9999;
    let mouseY = -9999;
    let pointerSeen = false;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    /* --------------------------------------------------------------- sprites */

    const makeStarSprite = (color: string) => {
      const c = document.createElement("canvas");
      c.width = SPRITE_PX;
      c.height = SPRITE_PX;
      const g = c.getContext("2d");
      if (!g) return c;

      const m = SPRITE_PX / 2;
      const grad = g.createRadialGradient(m, m, 0, m, m, m);
      // A tight bright core with a long, very thin tail is what reads as
      // glare. Widen the middle stops and it turns into a cotton ball.
      grad.addColorStop(0, withAlpha(color, 1));
      grad.addColorStop(0.07, withAlpha(color, 0.5));
      grad.addColorStop(0.22, withAlpha(color, 0.1));
      grad.addColorStop(0.5, withAlpha(color, 0.022));
      grad.addColorStop(1, withAlpha(color, 0));

      g.fillStyle = grad;
      g.fillRect(0, 0, SPRITE_PX, SPRITE_PX);
      return c;
    };

    const makeDustSprite = () => {
      const c = document.createElement("canvas");
      c.width = SPRITE_PX;
      c.height = SPRITE_PX;
      const g = c.getContext("2d");
      if (!g) return c;

      const m = SPRITE_PX / 2;
      const grad = g.createRadialGradient(m, m, 0, m, m, m);
      // Near-linear falloff: bokeh is soft the whole way out, with no core.
      grad.addColorStop(0, "rgba(178,203,255,0.42)");
      grad.addColorStop(0.45, "rgba(150,180,255,0.14)");
      grad.addColorStop(0.75, "rgba(140,170,255,0.04)");
      grad.addColorStop(1, "rgba(140,170,255,0)");

      g.fillStyle = grad;
      g.fillRect(0, 0, SPRITE_PX, SPRITE_PX);
      return c;
    };

    const starSprites = STAR_COLORS.map(makeStarSprite);
    const dustSprite = makeDustSprite();

    /* ----------------------------------------------------------------- build */

    const build = () => {
      const rect = starCanvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      fieldX0 = -EDGE_FADE;
      fieldY0 = -EDGE_FADE;
      fieldX1 = width + EDGE_FADE;
      // Extra room below, for the deepest layer's upward scroll travel.
      fieldY1 = height * 1.3 + EDGE_FADE;
      fieldW = fieldX1 - fieldX0;
      fieldH = fieldY1 - fieldY0;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      starCanvas.width = Math.round(width * dpr);
      starCanvas.height = Math.round(height * dpr);
      starCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Gas is blurred past recognition, so a fifth-resolution buffer is plenty.
      cloudCanvas.width = Math.max(1, Math.round(width / 5));
      cloudCanvas.height = Math.max(1, Math.round(height / 5));

      // Density per unit of *field*, so the overscan doesn't thin the sky out.
      // Denser on a desktop canvas than on a phone: the halo pass is fill-rate
      // bound, and a mid-range phone at DPR 3 is already pushing enough pixels.
      const dense = width > 700;
      const total = Math.round(
        Math.min(dense ? 660 : 300, (fieldW * fieldH) / (dense ? 2500 : 4200)),
      );

      layers = LAYER_SPEC.map((spec) => ({
        mouse: spec.mouse,
        scroll: spec.scroll,
        glow: spec.glow,
        link: spec.link,
        stars: Array.from({ length: Math.round(total * spec.share) }, () => {
          const tint = Math.floor(Math.random() * STAR_COLORS.length);
          return {
            x: fieldX0 + Math.random() * fieldW,
            y: fieldY0 + Math.random() * fieldH,
            r: rand(spec.rMin, spec.rMax),
            alpha: rand(spec.aMin, spec.aMax),
            vx: rand(-2, 2),
            vy: rand(-4.8, -1),
            color: STAR_COLORS[tint],
            sprite: starSprites[tint],
            // Only some stars twinkle; all of them twinkling looks like noise.
            twinkles: Math.random() < 0.55,
            phase: Math.random() * Math.PI * 2,
            speed: rand(0.6, 1.9),
            lum: 0,
          };
        }),
      }));

      const short = Math.min(width, height);
      clouds = CLOUDS.map((cloud, i) => ({
        ...cloud,
        x: width * (0.2 + 0.2 * i),
        y: height * (i % 2 === 0 ? 0.36 : 0.62),
        r: short * rand(0.5, 0.85),
      }));

      dust = Array.from(
        { length: Math.round(Math.min(dense ? 30 : 14, (fieldW * fieldH) / 58000)) },
        () => ({
          x: fieldX0 + Math.random() * fieldW,
          y: fieldY0 + Math.random() * fieldH,
          // A wider size range now that there are more of them — uniform
          // motes at this count start to read as a repeating texture.
          r: rand(short * 0.035, short * 0.15),
          alpha: rand(0.08, 0.26),
          vx: rand(-6, 6),
          vy: rand(-13, -2),
          phase: Math.random() * Math.PI * 2,
          speed: rand(0.08, 0.22),
        }),
      );

      meteors = [];
    };

    /* ---------------------------------------------------------------- clouds */

    const drawClouds = (time: number) => {
      const w = cloudCanvas.width;
      const h = cloudCanvas.height;

      cloudCtx.clearRect(0, 0, w, h);
      // Additive blending is what turns overlapping blobs into glowing gas
      // instead of muddy stacked circles.
      cloudCtx.globalCompositeOperation = "lighter";

      for (const cloud of clouds) {
        const cx =
          (cloud.x + Math.sin(time * cloud.sx + cloud.phase) * width * cloud.ax) / 5;
        const cy =
          (cloud.y + Math.cos(time * cloud.sy + cloud.phase) * height * cloud.ay) / 5;
        // Each cloud breathes on its own clock, so the gas never pulses as a
        // single mass — that's the tell that it's four circles.
        const breath = 1 + Math.sin(time * cloud.sx * 1.6 + cloud.phase) * 0.14;
        const r = (cloud.r / 5) * breath;

        const gradient = cloudCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, cloud.hue);
        gradient.addColorStop(0.45, `${cloud.hue}66`);
        gradient.addColorStop(1, "transparent");

        cloudCtx.globalAlpha = cloud.alpha * (0.86 + (breath - 1) * 0.7);
        cloudCtx.fillStyle = gradient;
        cloudCtx.beginPath();
        cloudCtx.arc(cx, cy, r, 0, Math.PI * 2);
        cloudCtx.fill();
      }

      cloudCtx.globalAlpha = 1;
      cloudCtx.globalCompositeOperation = "source-over";
    };

    /* --------------------------------------------------------------- meteors */

    const spawnMeteor = () => {
      const fromLeft = Math.random() < 0.7;
      const speed = rand(420, 760);
      const angle = rand(0.28, 0.52); // shallow diagonal

      meteors.push({
        x: fromLeft ? rand(-0.1, 0.5) * width : rand(0.5, 1.1) * width,
        y: rand(-0.05, 0.35) * height,
        vx: (fromLeft ? 1 : -1) * speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        life: 0,
        ttl: rand(0.7, 1.25),
        len: rand(90, 220),
      });
    };

    const drawMeteors = (dt: number) => {
      for (let i = meteors.length - 1; i >= 0; i -= 1) {
        const m = meteors[i];
        m.life += dt;

        if (m.life > m.ttl) {
          meteors.splice(i, 1);
          continue;
        }

        m.x += m.vx * dt;
        m.y += m.vy * dt;

        const k = m.life / m.ttl;
        // Fade in fast, out slow — a hard cut at either end reads as a glitch.
        const fade = Math.min(1, k * 6) * (1 - k) ** 1.5;
        const speed = Math.hypot(m.vx, m.vy);
        const tailX = m.x - (m.vx / speed) * m.len;
        const tailY = m.y - (m.vy / speed) * m.len;

        const trail = starCtx.createLinearGradient(m.x, m.y, tailX, tailY);
        trail.addColorStop(0, `rgba(255,255,255,${0.85 * fade})`);
        trail.addColorStop(0.35, `rgba(199,216,255,${0.32 * fade})`);
        trail.addColorStop(1, "rgba(199,216,255,0)");

        starCtx.strokeStyle = trail;
        starCtx.lineWidth = 1.7;
        starCtx.lineCap = "round";
        starCtx.beginPath();
        starCtx.moveTo(m.x, m.y);
        starCtx.lineTo(tailX, tailY);
        starCtx.stroke();

        // Bloom the head off the same sprite the stars use, so a meteor looks
        // like something burning rather than a dot with a line behind it.
        const halo = 34;
        starCtx.globalCompositeOperation = "lighter";
        starCtx.globalAlpha = fade * 0.9;
        starCtx.drawImage(starSprites[0], m.x - halo / 2, m.y - halo / 2, halo, halo);
        starCtx.globalCompositeOperation = "source-over";

        starCtx.globalAlpha = fade;
        starCtx.fillStyle = "#FFFFFF";
        starCtx.beginPath();
        starCtx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
        starCtx.fill();
        starCtx.globalAlpha = 1;
      }
    };

    /* ------------------------------------------------------------------ dust */

    const drawDust = (time: number, dt: number) => {
      starCtx.save();
      // Motes take the shallowest parallax of anything here: they read as very
      // close to the lens, and close things move least under a small shift.
      starCtx.translate(pointerX * 9, pointerY * 9);

      for (const mote of dust) {
        if (!reduce) {
          mote.x += mote.vx * dt;
          mote.y += mote.vy * dt;

          // Motes carry no edge fade, so they wrap a full radius clear of the
          // field instead — well off-screen, where the swap can't be seen.
          const pad = mote.r;
          if (mote.y < fieldY0 - pad) mote.y = fieldY1 + pad;
          if (mote.y > fieldY1 + pad) mote.y = fieldY0 - pad;
          if (mote.x < fieldX0 - pad) mote.x = fieldX1 + pad;
          if (mote.x > fieldX1 + pad) mote.x = fieldX0 - pad;
        }

        const breath = 0.78 + Math.sin(time * mote.speed + mote.phase) * 0.22;
        const size = mote.r * 2 * breath;

        starCtx.globalAlpha = mote.alpha * breath;
        starCtx.drawImage(dustSprite, mote.x - size / 2, mote.y - size / 2, size, size);
      }

      starCtx.restore();
    };

    /* ----------------------------------------------------------------- links */

    const drawLinks = (stars: Star[], px: number, py: number) => {
      starCtx.lineWidth = 0.6;
      starCtx.strokeStyle = "#9FC4FF";

      for (let i = 0; i < stars.length; i += 1) {
        const a = stars[i];
        for (let j = i + 1; j < stars.length; j += 1) {
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;

          const falloff = 1 - Math.sqrt(d2) / LINK_DIST;
          // Lines are a whisper everywhere and only resolve near the cursor.
          // Wire the whole field permanently and it stops being a sky and
          // starts being a network diagram.
          const near = Math.max(
            0,
            1 -
              Math.hypot((a.x + b.x) / 2 - px, (a.y + b.y) / 2 - py) /
                POINTER_REACH,
          );

          const alpha = falloff * falloff * (0.032 + near * near * 0.46);
          if (alpha < 0.005) continue;

          starCtx.globalAlpha = alpha;
          starCtx.beginPath();
          starCtx.moveTo(a.x, a.y);
          starCtx.lineTo(b.x, b.y);
          starCtx.stroke();
        }
      }
    };

    /* ----------------------------------------------------------------- stars */

    const drawPointerGlow = () => {
      const r = POINTER_REACH * 1.2;
      const grad = starCtx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, r);
      grad.addColorStop(0, "rgba(150,185,255,0.05)");
      grad.addColorStop(0.6, "rgba(150,185,255,0.014)");
      grad.addColorStop(1, "rgba(150,185,255,0)");

      starCtx.fillStyle = grad;
      starCtx.fillRect(mouseX - r, mouseY - r, r * 2, r * 2);
    };

    const drawStars = (time: number, dt: number) => {
      starCtx.clearRect(0, 0, width, height);

      starCtx.globalCompositeOperation = "lighter";
      drawDust(time, dt);
      if (pointerSeen) drawPointerGlow();
      starCtx.globalCompositeOperation = "source-over";

      const clampedScroll = Math.min(scrollY, height * 2.5);

      for (const layer of layers) {
        const tx = pointerX * layer.mouse;
        const ty = pointerY * layer.mouse - clampedScroll * layer.scroll;

        starCtx.save();
        starCtx.translate(tx, ty);

        // The cursor has to be moved into this layer's space, or the lift
        // would lag the stars it is meant to be lighting.
        const px = mouseX - tx;
        const py = mouseY - ty;

        for (const star of layer.stars) {
          if (!reduce) {
            star.x += star.vx * dt;
            star.y += star.vy * dt;

            // Wrapping exactly at the bounds never pops, because the edge
            // fade below is already zero there: a star leaves at nothing and
            // comes back at nothing.
            if (star.y < fieldY0) star.y = fieldY1;
            if (star.y > fieldY1) star.y = fieldY0;
            if (star.x < fieldX0) star.x = fieldX1;
            if (star.x > fieldX1) star.x = fieldX0;
          }

          let twinkle = 1;
          if (!reduce && star.twinkles) {
            // Squaring the wave lengthens the dim troughs and shortens the
            // peaks, which is how a star actually scintillates. A raw sine
            // spends half its time bright and strobes.
            const wave = 0.5 + Math.sin(time * star.speed + star.phase) * 0.5;
            twinkle = 0.34 + wave * wave * 0.66;
          }

          // Zero at the field bounds, full one fade-width inside them. The
          // bounds sit off-canvas, so this is never a visible dim band.
          const edge =
            Math.min(
              star.x - fieldX0,
              fieldX1 - star.x,
              star.y - fieldY0,
              fieldY1 - star.y,
            ) / EDGE_FADE;

          // The cursor lifts whatever it passes over — the one thing a video
          // background can never do.
          const lift =
            1 +
            Math.max(0, 1 - Math.hypot(star.x - px, star.y - py) / POINTER_REACH) *
              0.75;

          star.lum = star.alpha * twinkle * Math.min(1, Math.max(0, edge)) * lift;
        }

        if (layer.glow > 0) {
          starCtx.globalCompositeOperation = "lighter";
          for (const star of layer.stars) {
            if (star.lum < 0.012) continue;
            const size = star.r * HALO_SCALE;
            starCtx.globalAlpha = Math.min(1, star.lum) * layer.glow;
            starCtx.drawImage(
              star.sprite,
              star.x - size / 2,
              star.y - size / 2,
              size,
              size,
            );
          }
          starCtx.globalCompositeOperation = "source-over";
        }

        if (layer.link) drawLinks(layer.stars, px, py);

        for (const star of layer.stars) {
          if (star.lum < 0.012) continue;
          starCtx.globalAlpha = Math.min(1, star.lum);
          starCtx.fillStyle = star.color;
          starCtx.beginPath();
          starCtx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          starCtx.fill();
        }

        starCtx.restore();
      }

      starCtx.globalAlpha = 1;

      if (!reduce) drawMeteors(dt);
    };

    /* ---------------------------------------------------------------- render */

    const render = (now: number) => {
      // Delta-time, not per-frame constants: without this the field drifts
      // twice as fast on a 120Hz display as it does on a 60Hz one.
      const delta = last ? Math.min(now - last, 50) / 1000 : 0;
      last = now;
      elapsed += delta;

      // Frame-rate independent easing toward the pointer target.
      const ease = 1 - Math.exp(-delta * 4);
      pointerX += (targetX - pointerX) * ease;
      pointerY += (targetY - pointerY) * ease;

      if (!reduce) {
        nextMeteor -= delta;
        if (nextMeteor <= 0 && meteors.length < 3) {
          spawnMeteor();
          nextMeteor = rand(2.2, 6.5);
        }
      }

      drawClouds(elapsed);
      drawStars(elapsed, delta);

      if (running && !reduce) frame = requestAnimationFrame(render);
    };

    build();
    render(0);

    if (reduce) return () => cancelAnimationFrame(frame);

    /**
     * Debounced, because `build` is not cheap — it reallocates the whole
     * field (up to ~660 stars plus the gas and the motes) and re-sizes two
     * canvases. Dragging a window edge fires resize continuously, and
     * rebuilding the sky on every one of those events both stutters and
     * reshuffles every star mid-drag. One rebuild once the drag settles.
     */
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        last = 0;
      }, 150);
    };

    const onPointer = (event: PointerEvent) => {
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
      // The canvas fills the pinned hero frame, so viewport coordinates are
      // canvas coordinates for as long as it is on screen — which is the only
      // time this gets read. Cheaper than a layout read per pointer move.
      mouseX = event.clientX;
      mouseY = event.clientY;
      pointerSeen = true;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("resize", onResize);
    if (finePointer) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !running) {
            running = true;
            last = 0;
            frame = requestAnimationFrame(render);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(frame);
          }
        }
      },
      { threshold: 0 },
    );
    observer.observe(starCanvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.field} aria-hidden="true">
      <canvas ref={cloudRef} className={styles.clouds} />
      <canvas ref={starsRef} className={styles.stars} />
      <span className={styles.grain} />
      <span className={styles.vignette} />
    </div>
  );
}

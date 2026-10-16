"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { BsVolumeMuteFill, BsVolumeUpFill } from "react-icons/bs";
import { FaAws } from "react-icons/fa6";
import {
  SiCloudinary,
  SiCss,
  SiDart,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  SiZod,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { stackFaces } from "@/data/portfolio";
import { playKeyClick, primeKeyClick } from "@/lib/key-click";
import type { StackFace, StackIcon } from "@/types/portfolio";
import styles from "./Skills.module.css";

const stackIcons: Record<StackIcon, IconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  html5: SiHtml5,
  css: SiCss,
  react: SiReact,
  vue: SiVuedotjs,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  // React Native has no mark of its own — upstream ships React's.
  reactnative: SiReact,
  flutter: SiFlutter,
  dart: SiDart,
  firebase: SiFirebase,
  nestjs: SiNestjs,
  node: SiNodedotjs,
  express: SiExpress,
  zod: SiZod,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  prisma: SiPrisma,
  cloudinary: SiCloudinary,
  docker: SiDocker,
  gitlab: SiGitlab,
  // Simple Icons dropped the AWS mark; Font Awesome still carries it.
  aws: FaAws,
  vercel: SiVercel,
};

/**
 * Where each face sits on the box. Index-matched to `stackFaces` and to the
 * rotation keyframes below — the three arrays are one table split in three,
 * so they can only be reordered together.
 */
const faceClass = ["front", "right", "back", "left", "top", "bottom"] as const;

/**
 * Scroll progress → cube rotation.
 *
 * Each stop parks one face square to the camera, so every pair is just the
 * inverse of that face's own transform in the stylesheet: the right face is
 * built at rotateY(90deg), so the cube turns rotateY(-90deg) to present it.
 *
 * Motion composes these as `rotateX(x) rotateY(y)`, which is why the last two
 * stops hold Y still at a full turn and move only X. Animating both there
 * would bring the lid in diagonally instead of flipping it up.
 */
const stops = [0, 0.2, 0.4, 0.6, 0.8, 1];
const rotateXStops = [0, 0, 0, 0, -90, 90];
const rotateYStops = [0, -90, -180, -270, -360, -360];

const SOUND_KEY = "stack-cube-sound";

/**
 * Whether the keys click, remembered across visits.
 *
 * Audio on hover is the kind of thing a reader wants to turn off exactly once,
 * so the preference outlives the session. It starts silent on touch pointers —
 * there is no hover there, so every tap would fire a click the reader never
 * asked for.
 */
function useKeySound() {
  const [enabled, setEnabled] = useState(false);
  const hoverable = useRef(false);

  useEffect(() => {
    hoverable.current = window.matchMedia("(hover: hover)").matches;
    if (!hoverable.current) return;

    let on = true;
    try {
      on = window.localStorage.getItem(SOUND_KEY) !== "off";
    } catch {
      // Private browsing, blocked storage — default to on and move on.
    }

    setEnabled(on);
    // Fetch and decode now rather than on the first hover, which would
    // otherwise be silent while the clip was still in flight.
    if (on) primeKeyClick();
  }, []);

  const toggle = useCallback(() => {
    setEnabled((on) => {
      const next = !on;
      try {
        window.localStorage.setItem(SOUND_KEY, next ? "on" : "off");
      } catch {
        // Nothing to do; the preference just will not survive the tab.
      }
      // Play on the way on, so the toggle previews what it turned on — and
      // because this is a real click, it is also what unlocks the audio
      // context on browsers that ignore hover as user activation.
      if (next) playKeyClick();
      return next;
    });
  }, []);

  const press = useCallback(() => {
    if (enabled && hoverable.current) playKeyClick();
  }, [enabled]);

  return { enabled, toggle, press };
}

function FaceKeys({
  face,
  onPress,
}: {
  face: StackFace;
  onPress: () => void;
}) {
  return (
    <ul className={styles.keys}>
      {face.items.map((tech) => {
        const Icon = stackIcons[tech.icon];
        return (
          <li key={tech.name} className={styles.key}>
            <span
              className={styles.cap}
              style={
                {
                  "--cap": tech.color,
                  "--ink": tech.ink ?? "#FFFFFF",
                } as CSSProperties
              }
              onPointerEnter={onPress}
            >
              <Icon className={styles.capIcon} aria-hidden="true" />
            </span>
            <span className={styles.legend}>{tech.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The flat branch: every face opened out into a plain grid.
 *
 * Narrow screens and reduced-motion readers get this. It is not a degraded
 * cube so much as the same content without the scroll cost — pinning a phone
 * to spin a box is hostile, and a box that spins after the reader asked their
 * OS for less motion is worse. The keycaps themselves still press.
 */
function StackGrid({
  header,
  onPress,
}: {
  header: ReactNode;
  onPress: () => void;
}) {
  return (
    <div className={styles.flatInner}>
      {header}
      <div className={styles.flat}>
        {stackFaces.map((face) => (
          <div key={face.id} className={styles.flatGroup}>
            <h3 className={styles.flatLabel}>{face.label}</h3>
            <FaceKeys face={face} onPress={onPress} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The cube branch.
 *
 * Deliberately its own component rather than a second return inside Skills:
 * useScroll binds to its target in a layout effect and will not rebind when a
 * ref fills in later. Mounting this only once the measurement has decided
 * means the ref is attached by the time that effect runs, which is the
 * difference between a cube that scrubs and a cube that sits still.
 */
function StackCube({
  header,
  onPress,
}: {
  header: ReactNode;
  onPress: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /**
   * Lenis already smooths the wheel, so this spring only rounds the corners
   * where the keyframes meet — stiff enough that the cube never reads as
   * detached from the scrollbar.
   */
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const rotateX = useTransform(progress, stops, rotateXStops);
  const rotateY = useTransform(progress, stops, rotateYStops);

  useMotionValueEvent(progress, "change", (value) => {
    const last = stackFaces.length - 1;
    const next = Math.min(last, Math.max(0, Math.round(value * last)));
    setActive((current) => (current === next ? current : next));
  });

  return (
    /* The tall element exists only to buy scroll distance for the scrub;
       everything visible lives in the sticky viewport inside it. */
    <div ref={trackRef} className={styles.track}>
      <div className={styles.viewport}>
        {header}

        <div className={styles.scene}>
          {/* Pulls the box back by half its depth so whichever face is parked
              sits at z=0 — unmagnified by the perspective, and so rasterised
              at 1:1 rather than scaled up and softened. */}
          <div className={styles.shift}>
            <motion.div
              className={styles.cube}
              style={{ rotateX, rotateY }}
              initial={false}
            >
              {stackFaces.map((face, i) => (
                <div
                  key={face.id}
                  className={`${styles.face} ${styles[faceClass[i]]}`}
                  /* Only the face square to the camera is announced. The other
                     five are edge-on or facing away, so reading them out would
                     just be noise — and the flat branch already exposes the
                     whole set in order. */
                  aria-hidden={i === active ? undefined : "true"}
                >
                  <span className={styles.faceLabel}>{face.label}</span>
                  <FaceKeys face={face} onPress={onPress} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className={styles.readout}>
          <ol className={styles.dots} aria-hidden="true">
            {stackFaces.map((face, i) => (
              <li
                key={face.id}
                className={i === active ? styles.dotOn : styles.dot}
              />
            ))}
          </ol>
          <p className={styles.hint}>
            <span className="mono">
              {String(active + 1).padStart(2, "0")} / 06
            </span>{" "}
            {stackFaces[active].label} &mdash; keep scrolling
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const reduce = useReducedMotion();
  /**
   * Lifted to the section so both branches share one mute state and one
   * toggle. Held lower down it was two independent states, and the flat
   * branch had no way to turn the sound off at all.
   */
  const { enabled, toggle, press } = useKeySound();
  /**
   * Starts false so the server render and the first client paint agree on the
   * flat branch; the effect below promotes wide screens to the cube on mount.
   */
  const [spins, setSpins] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 760px)");
    const sync = () => setSpins(query.matches && !reduce);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [reduce]);

  const header = (
    <div className={styles.head}>
      <div className={styles.headRow}>
        {/* The site's section heading, as every other section has. This one
            used to run its own system — an 11px kicker over a sans h2 — which
            made Stack the one section whose heading didn't match its rank. */}
        <h2 className={`sectionTitle ${styles.heading}`}>Tech stack</h2>
        <span className="sectionMarker" aria-hidden="true" />
        <button
          type="button"
          className={styles.sound}
          onClick={toggle}
          aria-pressed={enabled}
          aria-label={enabled ? "Mute key clicks" : "Unmute key clicks"}
          title={enabled ? "Mute key clicks" : "Unmute key clicks"}
        >
          {enabled ? <BsVolumeUpFill /> : <BsVolumeMuteFill />}
        </button>
      </div>
      <p className={styles.lead}>
        Six faces, <em className={styles.accent}>everything I build with</em>.
      </p>
    </div>
  );

  return (
    <section
      id="skills"
      className={`band ${styles.section}`}
      data-nav-dark=""
      aria-label="Tech stack"
    >
      {spins ? (
        <StackCube header={header} onPress={press} />
      ) : (
        <StackGrid header={header} onPress={press} />
      )}
    </section>
  );
}

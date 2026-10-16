/**
 * The keycap click.
 *
 * Decoded once into an AudioBuffer and replayed from there rather than through
 * an <audio> element. Two reasons: a BufferSource starts on the same frame it
 * is asked to, where an element has perceptible attack latency, and buffers
 * overlap freely — running a pointer across the grid fires presses faster than
 * one element can rewind itself.
 *
 * Nothing loads until something asks for it, so a reader who never reaches the
 * stack section never fetches the clip.
 */

const CLIP = "/sounds/keyboard-click.mp3";

let ctx: AudioContext | null = null;
let buffer: AudioBuffer | null = null;
let pending: Promise<void> | null = null;
/** One failure is permanent — a browser that blocks audio keeps blocking it. */
let broken = false;

function getContext() {
  if (broken) return null;
  if (ctx) return ctx;

  try {
    ctx = new AudioContext();
  } catch {
    broken = true;
    return null;
  }

  return ctx;
}

function load(context: AudioContext) {
  if (buffer || pending) return pending ?? Promise.resolve();

  pending = fetch(CLIP)
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status}`);
      return res.arrayBuffer();
    })
    .then((bytes) => context.decodeAudioData(bytes))
    .then((decoded) => {
      buffer = decoded;
    })
    .catch(() => {
      // Missing file, offline, or a codec the browser will not take. The keys
      // still press; they just press silently.
      broken = true;
    })
    .finally(() => {
      pending = null;
    });

  return pending;
}

/**
 * Fetches and decodes the clip ahead of the first press.
 *
 * Worth calling as soon as the section knows sound is wanted: an AudioContext
 * created before any user gesture is merely suspended, not refused, and
 * decoding works fine while it is. Without this the first hover is silent
 * while the fetch is still in flight.
 */
export function primeKeyClick() {
  const context = getContext();
  if (context) void load(context);
}

/**
 * Plays one click. Safe to call on every pointerenter — a no-op until the clip
 * is decoded and the browser has granted audio.
 *
 * Browsers gate playback behind user activation and a hover does not always
 * qualify, so this resumes opportunistically and stays quiet rather than
 * nagging for a click.
 */
export function playKeyClick(volume = 0.5) {
  const context = getContext();
  if (!context) return;

  if (!buffer) {
    void load(context);
    return;
  }

  if (context.state === "suspended") {
    void context.resume().catch(() => {});
  }
  if (context.state !== "running") return;

  const source = context.createBufferSource();
  source.buffer = buffer;
  // A real board never gives you the same click twice; a few percent of pitch
  // either way is enough to stop a fast run across the grid sounding looped.
  source.playbackRate.value = 0.94 + Math.random() * 0.12;

  const gain = context.createGain();
  gain.gain.value = volume * (0.88 + Math.random() * 0.12);

  source.connect(gain).connect(context.destination);
  source.onended = () => gain.disconnect();
  source.start();
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "./theme";

/**
 * The hero backdrop.
 *
 * Wraps `components/shader.tsx` so the raw shader never has to know anything
 * about this page. Everything that makes it belong here lives in this file and
 * in the `.hero-backdrop` rule: the mask, the dimming, the per-theme blend.
 *
 * Three things the wrapper is responsible for:
 *
 * 1. Cost. three.js and @react-three/fiber are a large bundle and the shader
 *    runs a render loop and a mousemove listener for as long as it is mounted.
 *    It is loaded dynamically with ssr:false, so none of it lands in the
 *    initial payload or runs on the server.
 *
 * 2. Consent. It does not mount at all when reduced motion is requested. This
 *    is continuous, mouse-reactive animation - exactly what that setting is
 *    asking not to receive - and there is nothing to explain by animating it,
 *    so the honest response is to leave it out rather than slow it down.
 *
 * 3. Restraint on small screens. Below 768px it is not mounted either: the
 *    hero is a single tight column there with no empty space for the shader to
 *    occupy, and a full-viewport fragment shader is a real battery cost on a
 *    phone.
 */
const Shader = dynamic(
  () => import("@/components/shader").then((m) => m.Shader),
  { ssr: false },
);

const WIDE = "(min-width: 48rem)";
const CALM = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const wide = window.matchMedia(WIDE);
  const calm = window.matchMedia(CALM);
  wide.addEventListener("change", onChange);
  calm.addEventListener("change", onChange);
  return () => {
    wide.removeEventListener("change", onChange);
    calm.removeEventListener("change", onChange);
  };
}

const shouldRender = () =>
  window.matchMedia(WIDE).matches && !window.matchMedia(CALM).matches;

/** Never on the server: there is no viewport and no WebGL context. */
const serverSnapshot = () => false;

/**
 * The shader is tinted from the accent role and grounded on the page
 * background, so the backdrop belongs to the palette rather than shipping its
 * own. These are the sRGB resolutions of --color-accent and --color-bg in each
 * theme: WebGL cannot consume the oklch() the tokens are authored in, so the
 * values are mirrored here and must be updated alongside them.
 *
 * The `bg` values are not the page colour, and deliberately so. Handing the
 * shader the page hex does not come back out as the page hex: three converts
 * it to linear on the way in and the shader applies its own gamma on the way
 * out, so the flat ground landed 2-10/255 dark and left a visible seam.
 *
 * White and black are the two values that survive that whole chain untouched,
 * and each one is the identity for a blend mode:
 *
 *   light - #ffffff under `multiply`. White leaves the page exactly as it is,
 *           so only what is darker than white shows.
 *   dark  - #000000 under `screen`. Black leaves the page exactly as it is, so
 *           only what is brighter than black shows.
 *
 * Both the flat ground and the shadow end of the refraction are set to that
 * identity colour, which is why the shadows read as white in light: they land
 * on the blend's neutral and drop out entirely, leaving the accent highlights
 * on paper with none of the dark muddiness. Dark is the same idea inverted.
 *
 * So the render matches the page by construction rather than by calibration,
 * in both themes, at any page colour.
 *
 * The `tint` is the accent token in dark and a light tint of it in light, and
 * that asymmetry is the blend mode's doing rather than a colour choice. Under
 * `multiply` the render *is* the multiplier, so handing it the accent itself -
 * a dark burnt orange, darker still once three converts it to linear - drives
 * the paper down towards black wherever the main colour falls. A light tint
 * multiplies to the same hue without the darkness. Dark uses `screen`, where
 * the accent adds light rather than removing it, so there it is passed
 * straight through untouched.
 */
const PALETTE = {
  light: { tint: "#fbd9c6", bg: "#ffffff", shadow: "#ffffff" },
  dark: { tint: "#ed7c45", bg: "#000000", shadow: "#000000" },
} as const;

/**
 * Rods across the frame. Higher is thinner.
 *
 * The shader measures its plane in units of half the canvas height, so one rod
 * is about (canvasHeight / 2) / rods pixels wide - roughly 90px at 4 on a
 * 720px-tall hero. Change this rather than scaling the element, which would
 * thicken the rods along with everything else.
 */
const ROD_DENSITY = 4;

/**
 * Pixel ratio cap.
 *
 * Cost scales with area, and this shader is expensive per pixel - `hash12`
 * runs about ten times and `sdfNormal` adds four more SDF evaluations for
 * every fragment. Left uncapped it rendered at the display's own ratio: on a
 * 2x screen that measured 2880x1444, 4.16 million fragments every frame, for
 * a soft blur nobody is inspecting. Capping at 1 cuts that fourfold and costs
 * nothing visible, because the render has no fine detail to lose. Raise it if
 * you ever want crisper rod edges.
 */
const MAX_DPR = 1;

/**
 * Pauses the render loop while the backdrop is off-screen or the tab is
 * hidden.
 *
 * Without this the loop never stops: with the hero scrolled completely out of
 * view the page was still spending a full frame's GPU budget on it, which is
 * what made scrolling stutter further down the page. `frameloop="never"`
 * halts the loop without tearing down the GL context, so resuming is instant
 * and there is no flash of a lost canvas.
 *
 * The margin resumes it a little before it scrolls back into view, so the
 * first visible frame is already live rather than the frozen last one.
 */
function useActive(
  ref: React.RefObject<HTMLDivElement | null>,
  mounted: boolean,
) {
  const [active, setActive] = useState(true);

  // `mounted` is a real dependency, not decoration. The element does not exist
  // on the first render - the wrapper returns null until the media queries have
  // been read - so without it this effect would run once against a null ref,
  // bail out, and never attach the observer once the element appeared.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let onScreen = true;
    const sync = () => setActive(onScreen && !document.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref, mounted]);

  return active;
}

export function HeroBackdrop() {
  const enabled = useSyncExternalStore(subscribe, shouldRender, serverSnapshot);
  const { theme } = useTheme();
  const frame = useRef<HTMLDivElement>(null);
  const active = useActive(frame, enabled);

  if (!enabled) return null;

  const palette = PALETTE[theme === "dark" ? "dark" : "light"];

  return (
    <div
      ref={frame}
      aria-hidden
      className="hero-backdrop pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <Shader
        color={palette.tint}
        background={palette.bg}
        shadow={palette.shadow}
        rods={ROD_DENSITY}
        dpr={MAX_DPR}
        frameloop={active ? "always" : "never"}
        // The component sizes itself to the viewport by default; here it has to
        // fill the hero instead. Marked important because its own height
        // classes are baked into the component.
        className="h-full! max-h-none! min-h-0! w-full!"
      />
    </div>
  );
}

import type { QualityMode } from "@/lib/perf/budgets";

export function getQualityMode(): QualityMode {
  if (typeof globalThis.window === "undefined") return "low";

  const browserNavigator = globalThis.navigator as Navigator & {
    deviceMemory?: number;
  };
  const hasLowMemory =
    "deviceMemory" in browserNavigator && browserNavigator.deviceMemory !== undefined
      ? browserNavigator.deviceMemory <= 4
      : false;

  const prefersReducedMotion = globalThis.window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const lowCoreCount =
    browserNavigator.hardwareConcurrency > 0 && browserNavigator.hardwareConcurrency <= 4;
  const narrowScreen = globalThis.window.innerWidth < 900;

  return hasLowMemory || prefersReducedMotion || lowCoreCount || narrowScreen
    ? "low"
    : "high";
}

export const performanceBudgets = {
  initialJsKb: 220,
  heroTextureMb: 1.5,
  maxDrawCalls: 90,
  maxTriangles: 140_000,
  targetFps: 55,
} as const;

export type QualityMode = "high" | "low";

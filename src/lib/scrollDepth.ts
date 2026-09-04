export const SCROLL_DEPTH_MILESTONES = [25, 50, 75, 90] as const;
export type ScrollDepthMilestone = (typeof SCROLL_DEPTH_MILESTONES)[number];

/** How far down the page the visitor has scrolled, as a 0–100 percentage of
 * scrollable distance. A page shorter than the viewport is fully "scrolled". */
export function computeScrollDepthPercent(params: { scrollY: number; viewportHeight: number; documentHeight: number }): number {
  const { scrollY, viewportHeight, documentHeight } = params;
  const scrollable = documentHeight - viewportHeight;
  if (scrollable <= 0) return 100;
  return Math.min(100, Math.max(0, ((scrollY + viewportHeight) / documentHeight) * 100));
}

/** Which milestones the current scroll position has newly crossed, given
 * the set already fired — each milestone should only ever be reported once
 * per page load. */
export function newlyCrossedMilestones(percent: number, alreadyFired: ReadonlySet<ScrollDepthMilestone>): ScrollDepthMilestone[] {
  return SCROLL_DEPTH_MILESTONES.filter((milestone) => percent >= milestone && !alreadyFired.has(milestone));
}

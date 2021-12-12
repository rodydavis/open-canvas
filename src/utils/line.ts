import { getSizeFromElement } from "./element";
import { Offset } from "./size";

/**
 * Check if a point is inside a line
 *
 * @param start Start point
 * @param end End point
 * @param target Offset to check
 * @param tolerance Tolerance
 */
export function isPointOnLine(
  start: Offset,
  end: Offset,
  target: Offset,
  tolerance = 1
): boolean {
  // if line is vertical
  if (start.x === end.x) {
    return Math.abs(target.x - start.x) <= tolerance;
  }

  // if line is horizontal
  if (start.y === end.y) {
    return Math.abs(target.y - start.y) <= tolerance;
  }

  // if line is diagonal
  const slope = (end.y - start.y) / (end.x - start.x);
  const intercept = start.y - slope * start.x;
  const y = slope * target.x + intercept;
  return Math.abs(y - target.y) <= tolerance;
}

/**
 * Calculate the midpoint of a line
 *
 * @param start Start point
 * @param end End point
 * @returns Midpoint
 */
export function getMidPoint(start: Offset, end: Offset): Offset {
  return {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
}

export function pointHit(
  ctx: CanvasRenderingContext2D,
  node: Element,
  path: Path2D,
  offset: Offset
): boolean {
  let match = false;
  ctx.save();
  const { x, y } = getSizeFromElement(node);
  ctx.translate(x, y);
  match =
    ctx.isPointInPath(path, offset.x, offset.y) ||
    ctx.isPointInStroke(path, offset.x, offset.y);
  ctx.restore();
  return match;
}

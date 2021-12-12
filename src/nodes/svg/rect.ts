import { getSizeFromElement } from "../../utils";

export function paintRect(ctx: CanvasRenderingContext2D, node: Element) {
  const fillColor = node.getAttribute("fill");
  const strokeColor = node.getAttribute("stroke");
  const strokeWidth = node.getAttribute("stroke-width");
  const path = pathRect(node);

  ctx.save();

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill(path);
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth ? Number(strokeWidth) : 1;
    ctx.stroke(path);
  }

  ctx.restore();
}

export function pathRect(node: Element) {
  const { width, height } = getSizeFromElement(node);
  const path = new Path2D();
  path.rect(0, 0, width, height);
  return path;
}

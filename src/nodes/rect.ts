import { CanvasNode } from "./base";

export function paintRect(ctx: CanvasRenderingContext2D, node: CanvasNode) {
  const { x, y, width, height } = node.rect;
  const fillColor = node.child.getAttribute("fill");
  const strokeColor = node.child.getAttribute("stroke");
  const strokeWidth = node.child.getAttribute("stroke-width");

  ctx.save();

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth ? parseFloat(strokeWidth) : 1;
    ctx.strokeRect(x, y, width, height);
  }

  ctx.restore();
}

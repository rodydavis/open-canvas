import { getSizeFromElement } from "../../utils";

export function paintRect(ctx: CanvasRenderingContext2D, node: Element) {
  const { x, y, width, height } = getSizeFromElement(node);
  const fillColor = node.getAttribute("fill");
  const strokeColor = node.getAttribute("stroke");
  const strokeWidth = node.getAttribute("stroke-width");

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

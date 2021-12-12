import { getSizeFromElement } from "../../utils";

export function paintCircle(ctx: CanvasRenderingContext2D, node: Element) {
  const { x, y, width, height } = getSizeFromElement(node);
  const fillColor = node.getAttribute("fill");
  const strokeColor = node.getAttribute("stroke");
  const strokeWidth = node.getAttribute("stroke-width");
  const cx = node.getAttribute("cx") || "50";
  const cy = node.getAttribute("cy") || "50";
  const r = node.getAttribute("r") || "50";

  ctx.save();

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x + width * parseFloat(cx) / 100, y + height * parseFloat(cy) / 100, width * parseFloat(r) / 100, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth ? parseFloat(strokeWidth) : 1;
    ctx.beginPath();
    ctx.arc(x + width * parseFloat(cx) / 100, y + height * parseFloat(cy) / 100, width * parseFloat(r) / 100, 0, 2 * Math.PI);
    ctx.stroke();
  }

  ctx.restore();
}

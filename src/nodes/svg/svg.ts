import { getSizeFromElement } from "../../utils";
import { paintNode } from "../base";

export const svgShapes = ["rect", "circle", "ellipse", "line", "polygon"];

export function paintSvg(ctx: CanvasRenderingContext2D, node: Element) {
  const { x, y, width, height } = getSizeFromElement(node);
  const fillColor = node.getAttribute("fill");
  const strokeColor = node.getAttribute("stroke");
  const strokeWidth = node.getAttribute("stroke-width");

  ctx.save();

  const children = Array.from(node.children);

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth ? parseFloat(strokeWidth) : 1;
    ctx.strokeRect(x, y, width, height);
  }

  ctx.translate(x, y);

  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.clip();

  for (const child of children) {
    paintNode(ctx, child);
  }

  ctx.restore();
}

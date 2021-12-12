import { paintG } from "./g";

export const svgShapes = [
  "rect",
  "circle",
  "ellipse",
  "line",
  "polygon",
  "svg",
  "g",
];

export function paintSvg(ctx: CanvasRenderingContext2D, node: Element) {
  const svg = node as SVGElement;
  paintG(ctx, svg);
}

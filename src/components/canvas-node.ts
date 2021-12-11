import { getSizeFromElement, Rect } from "../utils";

export class CanvasNode {
  constructor(readonly rect: Rect, readonly child: Element) {}

  paint(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height } = this.rect;
    if (this.child.tagName === "RECT") {
      ctx.save();
      ctx.fillStyle = this.child.getAttribute("fill") || "blue";
      ctx.fillRect(x, y, width, height);
      ctx.restore();
    }
  }
}

export function getNodes(elements: Element[]): CanvasNode[] {
  const items = [];
  for (const child of elements) {
    const { x, y, width, height } = getSizeFromElement(child);
    const rect = { x, y, width, height };
    items.push(new CanvasNode(rect, child));
  }
  return items;
}

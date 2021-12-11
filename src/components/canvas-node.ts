import { getSizeFromElement, Rect } from "../utils";

export class CanvasNode {
  constructor(readonly child: Element) {}

  get tag(): string {
    return this.child.tagName.toLowerCase();
  }

  get rect(): Rect {
    return getSizeFromElement(this.child);
  }

  paint(ctx: CanvasRenderingContext2D): boolean {
    const { x, y, width, height } = this.rect;
    const fillColor = this.child.getAttribute("fill") || "blue";

    ctx.save();

    let painted = false;

    switch (this.tag) {
      case "rect":
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, width, height);
        painted = true;
        break;
      default:
        break;
    }

    ctx.restore();

    return painted;
  }
}

export function getNodes(elements: Element[]): CanvasNode[] {
  return elements.map((child) => new CanvasNode(child));
}

import { getSizeFromElement, Rect } from "../utils";
import { paintRect } from "./rect";

export class CanvasNode {
  constructor(readonly child: Element) {}

  get tag(): string {
    return this.child.tagName.toLowerCase();
  }

  get rect(): Rect {
    return getSizeFromElement(this.child);
  }

  paint(ctx: CanvasRenderingContext2D) {
    switch (this.tag) {
      case "rect":
        paintRect(ctx, this);
        break;
      default:
        break;
    }

    this.paintBackground(ctx);
  }

  paintBackground(ctx: CanvasRenderingContext2D) {
    ctx.save();

    const { x, y, width, height } = this.rect;

    if (this.child.hasAttribute("selected")) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(x, y, width, height);
    }

    ctx.restore();
  }
}

export function getNodes(elements: Element[]): CanvasNode[] {
  return elements.map((child) => new CanvasNode(child));
}

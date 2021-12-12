import { getSizeFromElement, randomColor, Rect } from "../utils";
import { paintCircle } from "./svg/circle";
import { paintG } from "./svg/g";
import { paintRect } from "./svg/rect";
import { paintSvg } from "./svg/svg";

export class CanvasNode {
  constructor(readonly child: Element) {}

  get tag(): string {
    return this.child.nodeName.toLowerCase();
  }

  get rect(): Rect {
    return getSizeFromElement(this.child);
  }

  paint(ctx: CanvasRenderingContext2D) {
    paintNode(ctx, this.child);
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

export function paintNode(ctx: CanvasRenderingContext2D, child: Element) {
  const tag = child.nodeName.toLowerCase();
  switch (tag) {
    case "rect":
      return paintRect(ctx, child);
    case "g":
      return paintG(ctx, child);
    case "circle":
      return paintCircle(ctx, child);
    case "svg":
      return paintSvg(ctx, child);
    default:
      break;
  }
}

export function randomNode() {
  const node = document.createElement("rect");
  node.setAttribute("x", "0");
  node.setAttribute("y", "0");
  node.setAttribute("width", "100");
  node.setAttribute("height", "100");
  node.setAttribute("fill", randomColor());
  return node;
}

export function getNodes(elements: Element[]): CanvasNode[] {
  return elements.map((child) => new CanvasNode(child));
}

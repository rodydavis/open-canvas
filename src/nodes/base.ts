import { pathRect } from ".";
import { getSizeFromElement, randomColor, Rect } from "../utils";
import {
  svgShapes,
  paintSvg,
  pathCircle,
  pathEllipse,
  pathPolygon,
  pathLine,
} from "./svg";

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
  ctx.save();
  if (svgShapes.includes(tag)) {
    const path = pathNode(child);
    const fillColor = child.getAttribute("fill");
    const strokeColor = child.getAttribute("stroke");
    const strokeWidth = child.getAttribute("stroke-width");
    const { x, y } = getSizeFromElement(child);

    ctx.translate(x, y);

    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill(path);
    }
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth ? Number(strokeWidth) : 1;
      ctx.stroke(path);
    }
  } else {
    switch (tag) {
      case "svg":
        paintSvg(ctx, child);
        break;
      default:
        break;
    }
  }
  ctx.restore();
}

export function pathNode(child: Element) {
  const tag = child.nodeName.toLowerCase();
  let path: Path2D | undefined;
  switch (tag) {
    case "circle":
      path = pathCircle(child);
      break;
    case "ellipse":
      path = pathEllipse(child);
      break;
    case "polygon":
      path = pathPolygon(child);
      break;
    case "line":
      path = pathLine(child);
      break;
    case "svg":
    case "g":
    case "rect":
    default:
      path = pathRect(child);
      break;
  }
  return path;
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

import { GraphNode, GraphStore } from "../graph";
import { Offset } from "../utils";
import { CanvasAppExtension } from "./base";

export const svgShapes = [
  "svg",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polygon",
  "path",
  "text",
  "g",
  "defs",
  "symbol",
  "use",
  "image",
  "pattern",
  "mask",
  "marker",
  "clipPath",
  "linearGradient",
  "radialGradient",
  "stop",
  "animate",
  "animateMotion",
  "animateColor",
  "animateTransform",
  "mpath",
  "set",
  "a",
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "glyph",
  "glyphRef",
  "textPath",
  "tref",
  "tspan",
  "view",
  "mask",
  "filter",
  "feBlend",
  "feColorMatrix",
];

export class SvgExtension extends CanvasAppExtension {
  valid(tag: string): boolean {
    return svgShapes.includes(tag);
  }

  createNode(element: Element, store: GraphStore): GraphNode {
    const id = store.generateId();
    const node = new GraphNode(id, this.elementTag(element), store);

    if (element.hasAttributes()) {
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        node.setAttribute(attr.name, attr.value);
      }
    }

    if (element.hasChildNodes()) {
      for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i];
        if (child.nodeType === 1) {
          const childNode = this.createNode(child as Element, store);
          node.children.push(childNode);
        }
      }
    }

    return node;
  }

  createElement(node: GraphNode): Element {
    const element = document.createElement(node.tag);
    const attrs = Array.from(node.attributes.entries());

    for (const [name, value] of attrs) {
      element.setAttribute(name, value);
    }

    if (node.children.length > 0) {
      for (const child of node.children) {
        element.appendChild(this.createElement(child));
      }
    }

    return element;
  }

  createPath(node: GraphNode): Path2D | null {
    const path = new Path2D();
    switch (node.tag) {
      case "polygon":
        {
          const points = node.getAttribute("points") ?? "";
          const pointsArray = points.split(" ");
          for (const point of pointsArray) {
            const [x, y] = point.split(",");
            const pointX = Number(x);
            const pointY = Number(y);
            path.lineTo(pointX, pointY);
          }
          path.closePath();
        }
        break;
      case "line":
        {
          const x1 = Number(node.getAttribute("x1") ?? "0");
          const y1 = Number(node.getAttribute("y1") ?? "0");
          const x2 = Number(node.getAttribute("x2") ?? "0");
          const y2 = Number(node.getAttribute("y2") ?? "0");
          const path = new Path2D();
          path.moveTo(x1, y1);
          path.lineTo(x2, y2);
        }
        break;
      case "circle":
        {
          const cx = node.getAttribute("cx") || "50";
          const cy = node.getAttribute("cy") || "50";
          const r = node.getAttribute("r") || "50";
          const path = new Path2D();
          path.arc(
            (node.width * parseFloat(cx)) / 100,
            (node.height * parseFloat(cy)) / 100,
            (node.width * parseFloat(r)) / 100,
            0,
            2 * Math.PI
          );
        }
        break;
      case "ellipse":
        {
          const cx = node.getAttribute("cx") || "50";
          const cy = node.getAttribute("cy") || "50";
          const rx = node.getAttribute("rx") || "50";
          const ry = node.getAttribute("ry") || "50";
          const path = new Path2D();
          path.ellipse(
            (node.width * parseFloat(cx)) / 100,
            (node.height * parseFloat(cy)) / 100,
            (node.width * parseFloat(rx)) / 100,
            (node.height * parseFloat(ry)) / 100,
            0,
            0,
            2 * Math.PI
          );
        }
        break;
      case "rect":
        {
          path.rect(node.x, node.y, node.width, node.height);
        }
        break;
      default:
        return null;
    }
    return path;
  }

  renderNode(node: GraphNode, ctx: CanvasRenderingContext2D): void {
    if (!this.valid(node.tag)) return;

    const fillColor = node.getAttribute("fill");
    const strokeColor = node.getAttribute("stroke");
    const strokeWidth = node.getAttribute("stroke-width");

    const path = this.createPath(node);
    if (path != null) {
      if (fillColor != null) {
        ctx.save();
        ctx.fillStyle = fillColor;
        ctx.fill(path);
        ctx.restore();
      }

      if (strokeColor != null) {
        ctx.save();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth != null ? Number(strokeWidth) : 1;
        ctx.stroke(path);
        ctx.restore();
      }

      if (node.tag === "svg" && node.getAttribute("viewBox") != null) {
        ctx.save();
        ctx.translate(node.x, node.y);

        const [x, y, width, height] = node
          .getAttribute("viewBox")!
          .split(" ")
          .map((v) => Number(v));
        ctx.scale(node.width / width, node.height / height);
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.clip();

        ctx.restore();
      }
    }

    for (const child of node.children) {
      this.renderNode(child, ctx);
    }
  }

  hitTest(
    node: GraphNode,
    ctx: CanvasRenderingContext2D,
    offset: Offset
  ): boolean {
    const path = this.createPath(node);
    if (path != null) {
      if (ctx.isPointInPath(path, offset.x, offset.y) === true) {
        return true;
      }
      if (ctx.isPointInStroke(path, offset.x, offset.y) === true) {
        return true;
      }
    } else {
      if (node.x <= offset.x && node.x + node.width >= offset.x) {
        if (node.y <= offset.y && node.y + node.height >= offset.y) {
          return true;
        }
      }
    }
    return false;
  }
}

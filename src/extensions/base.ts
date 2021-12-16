import { GraphNode, GraphStore } from "../graph";
import { Offset } from "../utils";

export abstract class CanvasAppExtension {
  abstract valid(tag: string): boolean;
  abstract createNode(element: Element, store: GraphStore): GraphNode;
  abstract createElement(node: GraphNode): Element;
  abstract renderNode(node: GraphNode, ctx: CanvasRenderingContext2D): void;

  hitTest(
    node: GraphNode,
    _ctx: CanvasRenderingContext2D,
    offset: Offset
  ): boolean {
    const nodeX = node.x;
    const nodeY = node.y;
    const nodeWidth = node.width;
    const nodeHeight = node.height;
    if (
      offset.x >= nodeX &&
      offset.x <= nodeX + nodeWidth &&
      offset.y >= nodeY &&
      offset.y <= nodeY + nodeHeight
    ) {
      return true;
    }
    return false;
  }

  elementTag(element: Element): string {
    return element.tagName.toLowerCase();
  }
}

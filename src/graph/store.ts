import { GraphEdge } from "./edge";
import { GraphNode } from "./node";

export class GraphStore {
  nodes: Map<string, GraphNode> = new Map();
  edges: Map<string, GraphEdge> = new Map();
  rootNodes: GraphNode[] = [];

  addNode(
    node: GraphNode,
    options?: {
      parent?: GraphNode;
      link?: boolean;
    }
  ) {
    this.nodes.set(node.id, node);
    if (!options?.parent) {
      this.rootNodes.push(node);
    } else if (options?.link) {
      this.linkNodes(options.parent.id, node.id);
    }
  }

  linkNodes(from: string, to: string) {
    const edge = new GraphEdge(this.generateId(), from, to, this);
    this.edges.set(edge.id, edge);
    this.nodes.get(from)!.children.push(this.nodes.get(to)!);
  }

  generateId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  updateNode(node: GraphNode) {
    this.nodes.set(node.id, node);
  }
}

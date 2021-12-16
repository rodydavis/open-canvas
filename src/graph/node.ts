import { GraphNodeBase } from "./base";
import { GraphStore } from "./store";

export class GraphNode extends GraphNodeBase {
  constructor(
    readonly id: string,
    readonly tag: string,
    readonly store: GraphStore
  ) {
    super(id, store);
  }
  children: GraphNode[] = [];
  attributes = new Map<string, string>();

  setAttribute(name: string, value: string) {
    this.attributes.set(name, value);
  }

  getAttribute(name: string): string | undefined {
    return this.attributes.get(name);
  }

  hasAttribute(name: string): boolean {
    return this.attributes.has(name);
  }

  removeAttribute(name: string) {
    this.attributes.delete(name);
  }

  get x(): number {
    const value = this.attributes.get("x");
    return value ? Number(value) : 0;
  }

  get y(): number {
    const value = this.attributes.get("y");
    return value ? Number(value) : 0;
  }

  get width(): number {
    const value = this.attributes.get("width");
    return value ? Number(value) : Number.MAX_VALUE;
  }

  get height(): number {
    const value = this.attributes.get("height");
    return value ? Number(value) : Number.MAX_VALUE;
  }
}

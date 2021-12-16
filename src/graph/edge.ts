import { GraphNodeBase } from "./base";
import { GraphStore } from "./store";

export class GraphEdge extends GraphNodeBase {
  constructor(
    readonly id: string,
    readonly from: string,
    readonly to: string,
    readonly store: GraphStore
  ) {
    super(id, store);
  }
}

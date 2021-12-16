import { GraphStore } from "./store";

export class GraphNodeBase {
  constructor(readonly id: string, readonly store: GraphStore) {}
}

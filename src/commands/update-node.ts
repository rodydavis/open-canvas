import { CanvasAppState } from "../components/canvas-context";
import { GraphNode } from "../graph";
import { BaseCommand } from "./base";

export class UpdateNode extends BaseCommand {
  constructor(readonly node: GraphNode) {
    super("update-node");
  }

  execute(state: CanvasAppState): void {
    state.store.updateNode(this.node);
    state.notifyListeners();
  }
}

import { CanvasAppState } from "../components/canvas-context";
import { GraphNode } from "../graph";
import { BaseCommand } from "./base";

export class UpdateSelection extends BaseCommand {
  constructor(readonly indices: GraphNode[]) {
    super("update-selection");
  }

  execute(state: CanvasAppState): void {
    state.selection = this.indices;
    for (const item of state.store.rootNodes) {
      selectAll(item, this.indices);
    }
    state.notifyListeners();
  }
}

function selectAll(element: GraphNode, selection: GraphNode[]) {
  if (selection.includes(element)) {
    element.setAttribute("selected", "");
  } else {
    element.removeAttribute("selected");
  }
  const children = Array.from(element.children);
  for (const child of children) {
    selectAll(child, selection);
  }
}

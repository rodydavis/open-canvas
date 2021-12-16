import { CanvasAppState } from "../components/canvas-context";
import { GraphNode } from "../graph";
import { BaseCommand } from "./base";
import { UpdateSelection } from "./update-selection";

export class AddNode extends BaseCommand {
  constructor() {
    super("add-node");
  }

  execute(state: CanvasAppState): void {
    // const node = randomNode();
    // app.appendChild(node);
    // app.items.push(node);
    // app.canvas.paint();
    // app.layers.requestUpdate();
    // const lastIdx = app.items.length - 1;
    const id = state.store.generateId();
    const node = new GraphNode(id, "rect", state.store);
    node.setAttribute('x', '0');
    node.setAttribute('y', '0');
    node.setAttribute('width', '100');
    node.setAttribute('height', '100');
    node.setAttribute('fill', '#fff');
    node.setAttribute('stroke', '#000');
    state.store.addNode(node);
    state.addCommand(new UpdateSelection([node]));
    state.notifyListeners();
  }
}

import { CanvasApp } from "../components/canvas-app";
import { randomNode } from "../nodes/base";
import { BaseCommand } from "./base";
import { UpdateSelection } from "./update-selection";

export class AddNode extends BaseCommand {
  constructor() {
    super("add-node");
  }

  execute(app: CanvasApp): void {
    const node = randomNode();
    app.appendChild(node);
    app.items.push(node);
    app.canvas.paint();
    app.layers.requestUpdate();
    app.addCommand(new UpdateSelection([app.items.length - 1]));
  }
}

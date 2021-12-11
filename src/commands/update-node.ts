import { CanvasApp } from "../components/canvas-app";
import { BaseCommand } from "./base";

export class UpdateNode extends BaseCommand {
  constructor(readonly index: number, readonly node: Element) {
    super("update-node");
  }

  execute(app: CanvasApp): void {
    const node = this.node;
    const index = this.index;
    app.items[index] = node;
    app.canvas.paint();
    app.layers.requestUpdate();
  }
}

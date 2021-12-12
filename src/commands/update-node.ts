import { CanvasApp } from "../components/canvas-app";
import { BaseCommand } from "./base";

export class UpdateNode extends BaseCommand {
  constructor(readonly node: Element, readonly index: number) {
    super("update-node");
  }

  execute(app: CanvasApp): void {
    const node = this.node;
    const index = this.index;
    app.items[index] = node;
    app.canvas.paint();
    app.layers.requestUpdate();
    app.properties.requestUpdate();
  }
}

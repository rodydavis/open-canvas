import { CanvasApp } from "../components/canvas-app";
import { BaseCommand } from "./base";

export class UpdateNode extends BaseCommand {
  constructor(readonly node: Element) {
    super("update-node");
  }

  execute(app: CanvasApp): void {
    app.canvas.paint();
    app.layers.requestUpdate();
    app.properties.requestUpdate();
  }
}

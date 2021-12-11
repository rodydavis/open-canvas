import { CanvasApp } from "../components/canvas-app";
import { Offset } from "../utils";
import { createMatrix, matrixInfo } from "../utils/matrix";
import { BaseCommand } from "./base";

export class PanCanvas extends BaseCommand {
  constructor(readonly delta: Offset) {
    super("pan-canvas");
  }

  execute(app: CanvasApp): void {
    const { offset, scale, rotation } = matrixInfo(app.canvas.context);
    let localOffset = offset;
    localOffset.x += this.delta.x / scale;
    localOffset.y += this.delta.y / scale;
    app.canvas.context = createMatrix(localOffset, scale, rotation);
  }
}

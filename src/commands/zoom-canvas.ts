import { CanvasApp } from "../components/canvas-app";
import { createMatrix, matrixInfo } from "../utils/matrix";
import { BaseCommand } from "./base";

export class ZoomCanvas extends BaseCommand {
  constructor(readonly delta: number) {
    super("zoom-canvas");
  }

  execute(app: CanvasApp): void {
    const { scale, offset, rotation } = matrixInfo(app.canvas.context);
    let localScale = scale;
    localScale += this.delta;
    app.canvas.context = createMatrix(offset, localScale, rotation);
  }
}

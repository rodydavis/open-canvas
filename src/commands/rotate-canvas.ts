import { CanvasApp } from "../components/canvas-app";
import { createMatrix, matrixInfo } from "../utils/matrix";
import { BaseCommand } from "./base";

export class RotateCanvas extends BaseCommand {
  constructor(readonly delta: number) {
    super("rotate-canvas");
  }

  execute(app: CanvasApp): void {
    const { rotation, offset, scale } = matrixInfo(app.canvas.context);
    let localRotation = rotation;
    localRotation += this.delta;
    app.canvas.context = createMatrix(offset, scale, localRotation);
  }
}

import { CanvasAppState } from "../components/canvas-context";
import { createMatrix, matrixInfo } from "../utils/matrix";
import { BaseCommand } from "./base";

export class RotateCanvas extends BaseCommand {
  constructor(readonly delta: number) {
    super("rotate-canvas");
  }

  execute(state: CanvasAppState): void {
    const { rotation, offset, scale } = matrixInfo(state.matrix);
    let localRotation = rotation;
    localRotation += this.delta;
    state.matrix = createMatrix(offset, scale, localRotation);
    state.notifyListeners();
  }
}

import { CanvasAppState } from "../components/canvas-context";
import { createMatrix, matrixInfo } from "../utils/matrix";
import { BaseCommand } from "./base";

export class ZoomCanvas extends BaseCommand {
  constructor(readonly delta: number) {
    super("zoom-canvas");
  }

  execute(state: CanvasAppState): void {
    const { scale, offset, rotation } = matrixInfo(state.matrix);
    let localScale = scale;
    localScale += this.delta;
    state.matrix = createMatrix(offset, localScale, rotation);
    state.notifyListeners();
  }
}

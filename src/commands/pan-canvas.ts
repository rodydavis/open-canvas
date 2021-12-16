import { CanvasAppState } from "../components/canvas-context";
import { Offset } from "../utils";
import { createMatrix, matrixInfo } from "../utils/matrix";
import { BaseCommand } from "./base";

export class PanCanvas extends BaseCommand {
  constructor(readonly delta: Offset) {
    super("pan-canvas");
  }

  execute(state: CanvasAppState): void {
    const { offset, scale, rotation } = matrixInfo(state.matrix);
    let localOffset = offset;
    localOffset.x += this.delta.x / scale;
    localOffset.y += this.delta.y / scale;
    state.matrix = createMatrix(localOffset, scale, rotation);
    state.notifyListeners();
  }
}

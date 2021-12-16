import { CanvasAppState } from "../components/canvas-context";
import { matrixInfo } from "../utils";
import { BaseCommand } from "./base";
import { PanCanvas } from "./pan-canvas";
import { ZoomCanvas } from "./zoom-canvas";

export class OnWheel extends BaseCommand {
  constructor(readonly event: WheelEvent) {
    super("on-wheel");
  }
  execute(state: CanvasAppState): void {
    const e = this.event;
    e.preventDefault();
    const { scale } = matrixInfo(state.matrix);
    if (e.ctrlKey) {
      const scaleDelta = -e.deltaY * 0.01;
      if (
        scale + scaleDelta > state.minScale &&
        scale + scaleDelta < state.maxScale
      ) {
        new ZoomCanvas(scaleDelta).execute(state);
      }
    } else {
      const offset = { x: -e.deltaX * 2 * scale, y: -e.deltaY * 2 * scale };
      new PanCanvas(offset).execute(state);
    }
    state.notifyListeners();
  }
}

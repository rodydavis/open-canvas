import { CanvasApp } from "../components";
import { matrixInfo } from "../utils";
import { BaseCommand } from "./base";
import { PanCanvas } from "./pan-canvas";
import { ZoomCanvas } from "./zoom-canvas";

export class OnWheel extends BaseCommand {
  constructor(readonly event: WheelEvent) {
    super("on-wheel");
  }
  execute(app: CanvasApp): void {
    const e = this.event;
    e.preventDefault();
    const { scale } = matrixInfo(app.canvas.context);
    if (e.ctrlKey) {
      const scaleDelta = -e.deltaY * 0.01;
      if (
        scale + scaleDelta > app.canvas.minScale &&
        scale + scaleDelta < app.canvas.maxScale
      ) {
        new ZoomCanvas(scaleDelta).dispatch(app);
      }
    } else {
      const offset = { x: -e.deltaX * 2 * scale, y: -e.deltaY * 2 * scale };
      new PanCanvas(offset).dispatch(app);
    }
    app.canvas.paint();
  }
}

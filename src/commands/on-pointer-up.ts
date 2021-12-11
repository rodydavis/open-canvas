import { CanvasApp } from "../components";
import { BaseCommand } from "./base";

export class OnPointerUp extends BaseCommand {
  constructor(readonly event: PointerEvent) {
    super("on-pointer-up");
  }
  execute(app: CanvasApp): void {
    const e = this.event;
    e.preventDefault();

    app.canvas.canvas.releasePointerCapture(e.pointerId);
    app.canvas.pointers.delete(e.pointerId);
  }
}

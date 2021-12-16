import { CanvasAppState } from "../components/canvas-context";
import { BaseCommand } from "./base";

export class OnPointerUp extends BaseCommand {
  constructor(readonly event: PointerEvent) {
    super("on-pointer-up");
  }
  execute(state: CanvasAppState): void {
    const e = this.event;
    e.preventDefault();

    state.canvas.releasePointerCapture(e.pointerId);
    state.pointers.delete(e.pointerId);
    state.notifyListeners();
  }
}

import { CanvasAppState } from "../components/canvas-context";
import { toWorld } from "../utils";
import { BaseCommand } from "./base";
import { UpdateSelection } from "./update-selection";

export class OnPointerDown extends BaseCommand {
  constructor(readonly event: PointerEvent) {
    super("on-pointer-down");
  }
  execute(state: CanvasAppState): void {
    const e = this.event;
    e.preventDefault();

    state.canvas.setPointerCapture(e.pointerId);
    state.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });

    const items = state.store.rootNodes;
    state.selection = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const mo = toWorld(state.matrix, { x: e.offsetX, y: e.offsetY });
      for (const ext of state.extensions) {
        if (ext.hitTest(item, state.ctx, mo)) {
          state.selection.push(item);
          break;
        }
      }
    }
    state.selection = state.selection.reverse();
    state.selection = state.selection.slice(0, 1);

    new UpdateSelection(state.selection).execute(state);
    state.notifyListeners();
  }
}

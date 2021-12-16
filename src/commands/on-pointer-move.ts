import { matrixInfo } from "../utils";
import { BaseCommand } from "./base";
import { UpdateNode } from ".";
import { CanvasAppState } from "../components/canvas-context";

export class OnPointerMove extends BaseCommand {
  constructor(readonly event: PointerEvent) {
    super("on-pointer-move");
  }
  execute(state: CanvasAppState): void {
    const e = this.event;
    e.preventDefault();
    if (state.pointers.get(e.pointerId)) {
      state.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
      const { scale } = matrixInfo(state.matrix);
      const md = { x: e.movementX / scale, y: e.movementY / scale };
      for (const item of state.selection) {
        // Move node
        const newX = item.x + md.x;
        const newY = item.y + md.y;
        item.setAttribute("x", newX.toString());
        item.setAttribute("y", newY.toString());
        new UpdateNode(item).execute(state);
      }
    }
    state.notifyListeners();
  }
}

import { CanvasApp } from "../components";
import { getSizeFromElement, matrixInfo } from "../utils";
import { BaseCommand } from "./base";
import { UpdateNode } from "./update-node";

export class OnPointerMove extends BaseCommand {
  constructor(readonly event: PointerEvent) {
    super("on-pointer-move");
  }
  execute(app: CanvasApp): void {
    const e = this.event;
    e.preventDefault();

    if (app.canvas.pointers.get(e.pointerId)) {
      app.canvas.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });

      const { scale } = matrixInfo(app.canvas.context);
      const md = { x: e.movementX / scale, y: e.movementY / scale };
      for (const item of app.canvas.selection) {
        const rect = getSizeFromElement(item);
        // Move node
        const newX = rect.x + md.x;
        const newY = rect.y + md.y;
        item.setAttribute("x", newX.toString());
        item.setAttribute("y", newY.toString());
        new UpdateNode(item).dispatch(app);
      }
    }
  }
}

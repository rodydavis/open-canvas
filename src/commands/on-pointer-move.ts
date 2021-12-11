import { CanvasApp } from "../components";
import { getNodes } from "../nodes";
import { matrixInfo } from "../utils";
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
      const nodes = getNodes(app.canvas.items);
      for (const idx of app.canvas.selection) {
        const item = nodes[idx];
        const realIdx = app.canvas.items.indexOf(item.child);
        // Move node
        const newX = item.rect.x + md.x;
        const newY = item.rect.y + md.y;
        item.child.setAttribute("x", newX.toString());
        item.child.setAttribute("y", newY.toString());
        new UpdateNode(item.child, realIdx).dispatch(app);
      }
    }
  }
}

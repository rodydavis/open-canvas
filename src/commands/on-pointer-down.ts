import { CanvasApp } from "../components";
import { getNodes, pathNode } from "../nodes";
import { pointHit, toWorld } from "../utils";
import { BaseCommand } from "./base";
import { UpdateSelection } from "./update-selection";

export class OnPointerDown extends BaseCommand {
  constructor(readonly event: PointerEvent) {
    super("on-pointer-down");
  }
  execute(app: CanvasApp): void {
    const e = this.event;
    e.preventDefault();

    app.canvas.canvas.setPointerCapture(e.pointerId);
    app.canvas.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });

    const items = getNodes(app.canvas.items);
    app.canvas.selection = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const mo = toWorld(app.canvas.context, { x: e.offsetX, y: e.offsetY });
      const path = pathNode(item.child);
      const hit = pointHit(app.canvas.ctx, item.child, path, mo);
      if (hit) {
        app.canvas.selection.push(item.child);
      }
    }
    app.canvas.selection = app.canvas.selection.reverse();
    app.canvas.selection = app.canvas.selection.slice(0, 1);

    new UpdateSelection(app.canvas.selection).dispatch(app);
  }
}

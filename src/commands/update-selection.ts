import { CanvasApp } from "../components/canvas-app";
import { getNodes } from "../nodes/base";
import { BaseCommand } from "./base";

export class UpdateSelection extends BaseCommand {
  constructor(readonly indices: number[]) {
    super("update-selection");
  }

  execute(app: CanvasApp): void {
    app.selection = this.indices;
    const items = getNodes(app.items);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (app.selection.includes(i)) {
        item.child.setAttribute("selected", "");
      } else {
        item.child.removeAttribute("selected");
      }
    }
    app.canvas.paint();
  }
}

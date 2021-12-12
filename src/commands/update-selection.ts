import { CanvasApp } from "../components/canvas-app";
import { BaseCommand } from "./base";

export class UpdateSelection extends BaseCommand {
  constructor(readonly indices: Element[]) {
    super("update-selection");
  }

  execute(app: CanvasApp): void {
    app.selection = this.indices;
    for (const item of app.items) {
      selectAll(item, this.indices);
    }
    app.canvas.paint();
  }
}

function selectAll(element: Element, selection: Element[]) {
  if (selection.includes(element)) {
    element.setAttribute("selected", "");
  } else {
    element.removeAttribute("selected");
  }
  const children = Array.from(element.children);
  for (const child of children) {
    selectAll(child, selection);
  }
}

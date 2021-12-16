import { CanvasAppState } from "../components/canvas-context";

export abstract class BaseCommand {
  constructor(readonly name: string) {}
  abstract execute(state: CanvasAppState): void;

  toEvent(): CustomEvent {
    return new CustomEvent("command", {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        execute: this.execute.bind(this),
      },
    });
  }

  dispatch(target: HTMLElement): void {
    target.dispatchEvent(this.toEvent());
  }
}

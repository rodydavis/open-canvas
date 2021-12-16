import { LitElement, ReactiveController } from "lit";
import { BaseCommand } from "../commands";
import { CanvasAppExtension, SvgExtension } from "../extensions";
import { GraphNode, GraphStore } from "../graph";
import { defaultMatrix, MatrixContext, Offset } from "../utils";
import { CanvasApp } from "./canvas-app";

export type CanvasAppStateCallback = (state: CanvasAppState) => void;

interface CanvasAppCallbackRequest {
  callback: CanvasAppStateCallback;
}

export class CanvasAppState {
  selection: GraphNode[] = [];
  extensions: CanvasAppExtension[] = [new SvgExtension()];
  store = new GraphStore();
  pointers: Map<number, Offset> = new Map();
  matrix: MatrixContext = defaultMatrix;
  minScale = 0.25;
  maxScale = 4;
  canvas = document.createElement("canvas");
  listeners: CanvasAppStateCallback[] = [];

  get ctx(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d")!;
  }

  addListener(listener: CanvasAppStateCallback) {
    this.listeners.push(listener);
  }

  removeListener(listener: CanvasAppStateCallback) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this));
  }

  addCommand(command: BaseCommand) {
    command.execute(this);
  }
}

export function useContext(host: LitElement) {
  const context = new CanvasController(host);
  host.dispatchEvent(
    new CustomEvent<CanvasAppCallbackRequest>("state-request", {
      detail: {
        callback: (state) => {
          context.state = state;
          host.requestUpdate();
        },
      },
      bubbles: true,
      composed: true,
    })
  );
  context.state!.addListener(() => {
    host.requestUpdate();
  });
  return context;
}

export function createContext(host: CanvasApp) {
  const context = new CanvasController(host);
  host.addEventListener("state-request", (e: Event) => {
    const event = e as CustomEvent<CanvasAppCallbackRequest>;
    event.detail.callback(context.state);
  });
  host.addEventListener("command", (e: Event) => {
    const event = e as CustomEvent;
    const command = event.detail as BaseCommand;
    command.execute(context.state);
  });
  return context;
}

export class CanvasController implements ReactiveController {
  debug = false;
  state = new CanvasAppState();

  constructor(readonly host: LitElement) {
    this.host.addController(this);
  }

  hostConnected() {}

  hostDisconnected() {}
}

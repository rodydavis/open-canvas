import { html, css, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { applyMatrix, matrixInfo } from "../utils/matrix";
import { pxToNumber } from "../utils";
import { drawGridBackground } from "../utils/grid";
import { OnPointerMove } from "../commands/on-pointer-move";
import { OnPointerDown } from "../commands/on-pointer-down";
import { OnPointerUp } from "../commands/on-pointer-up";
import { OnWheel } from "../commands/on-wheel";
import { useContext } from "./canvas-context";

@customElement("canvas-view")
export class CanvasView extends LitElement {
  static styles = css``;
  canvas?: HTMLCanvasElement;

  @state() context = useContext(this);

  render() {
    if (!this.canvas) {
      return html`Loading...`;
    }
    return html`${this.context.state.canvas}`;
  }

  firstUpdated() {
    this.context = useContext(this);
    const state = this.context.state;
    this.canvas = state.canvas;
    this.paint();
    state.addListener(() => {
      this.paint();
    });
    state.canvas.addEventListener("pointerup", (e: PointerEvent) => {
      new OnPointerUp(e).dispatch(this);
    });
    state.canvas.addEventListener("pointerdown", (e: PointerEvent) => {
      new OnPointerDown(e).dispatch(this);
    });
    state.canvas.addEventListener("pointermove", (e: PointerEvent) => {
      new OnPointerMove(e).dispatch(this);
    });
    state.canvas.addEventListener("wheel", (e: WheelEvent) => {
      new OnWheel(e).dispatch(this);
    });
  }

  paint() {
    const state = this.context.state;
    const style = getComputedStyle(this);
    const width = (state.canvas.width = pxToNumber(style.width));
    const height = (state.canvas.height = pxToNumber(style.height));

    state.ctx.save();

    // Clear canvas
    state.ctx.clearRect(0, 0, width, height);

    // Draw grid background
    const { scale, offset } = matrixInfo(state.matrix);
    const size = { width, height };
    drawGridBackground(state.ctx, size, offset, scale);

    applyMatrix(state.ctx, state.matrix);

    for (const node of state.store.rootNodes) {
      for (const ext of state.extensions) {
        if (ext.valid(node.tag)) {
          ext.renderNode(node, state.ctx);
        }
      }
    }

    state.ctx.restore();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-view": CanvasView;
  }
}

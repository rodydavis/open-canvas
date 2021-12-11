import { html, css, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import {
  MatrixContext,
  defaultMatrix,
  applyMatrix,
  matrixInfo,
} from "../utils/matrix";
import { Offset, pxToNumber } from "../utils";
import { drawGridBackground } from "../utils/grid";
import { getNodes } from "../nodes";
import { OnPointerMove } from "../commands/on-pointer-move";
import { OnPointerDown } from "../commands/on-pointer-down";
import { OnPointerUp } from "../commands/on-pointer-up";
import { OnWheel } from "../commands/on-wheel";

@customElement("canvas-view")
export class CanvasView extends LitElement {
  static styles = css``;

  @property({ type: Number, attribute: "min-scale" }) minScale = 0.25;
  @property({ type: Number, attribute: "max-scale" }) maxScale = 4;
  @property({ type: Array }) items: Element[] = [];
  @property({ type: Array }) selection: number[] = [];
  @query("canvas") canvas!: HTMLCanvasElement;
  @state() context: MatrixContext = defaultMatrix;
  pointers: Map<number, Offset> = new Map();

  render() {
    return html`<canvas
      @pointerup=${(e: PointerEvent) => new OnPointerUp(e).dispatch(this)}
      @pointerdown=${(e: PointerEvent) => new OnPointerDown(e).dispatch(this)}
      @pointermove=${(e: PointerEvent) => new OnPointerMove(e).dispatch(this)}
      @wheel=${(e: WheelEvent) => new OnWheel(e).dispatch(this)}
    ></canvas>`;
  }

  private get ctx(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d")!;
  }

  firstUpdated() {
    this.paint();
  }

  paint() {
    const style = getComputedStyle(this);
    const width = (this.canvas.width = pxToNumber(style.width));
    const height = (this.canvas.height = pxToNumber(style.height));

    this.ctx.save();

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    // Draw grid background
    const { scale, offset } = matrixInfo(this.context);
    const size = { width, height };
    drawGridBackground(this.ctx, size, offset, scale);

    applyMatrix(this.ctx, this.context);

    // Draw children
    const items = getNodes(this.items);
    for (const node of items) {
      node.paint(this.ctx);
    }

    this.ctx.restore();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-view": CanvasView;
  }
}

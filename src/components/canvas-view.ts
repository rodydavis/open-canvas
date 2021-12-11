import { html, css, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import {
  MatrixContext,
  defaultMatrix,
  applyMatrix,
  matrixInfo,
  toWorld,
} from "../utils/matrix";
import { Offset, pxToNumber } from "../utils";
import { drawGridBackground } from "../utils/grid";
import { getNodes } from "../nodes";
import {
  PanCanvas,
  UpdateNode,
  UpdateSelection,
  ZoomCanvas,
} from "../commands";

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
      @pointerup=${(e: PointerEvent) => this.onPointerUp(e)}
      @pointerdown=${(e: PointerEvent) => this.onPointerDown(e)}
      @pointermove=${(e: PointerEvent) => this.onPointerMove(e)}
      @wheel=${(e: WheelEvent) => this.onWheel(e)}
    ></canvas>`;
  }

  private get ctx(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d")!;
  }

  firstUpdated() {
    this.paint();
  }

  onPointerMove(e: PointerEvent) {
    e.preventDefault();

    if (this.pointers.get(e.pointerId)) {
      this, this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });

      const { scale } = matrixInfo(this.context);
      const md = { x: e.movementX / scale, y: e.movementY / scale };
      const nodes = getNodes(this.items);
      for (const idx of this.selection) {
        const item = nodes[idx];
        const realIdx = this.items.indexOf(item.child);
        // Move node
        const newX = item.rect.x + md.x;
        const newY = item.rect.y + md.y;
        item.child.setAttribute("x", newX.toString());
        item.child.setAttribute("y", newY.toString());
        new UpdateNode(item.child, realIdx).dispatch(this);
      }
    }
  }

  onPointerDown(e: PointerEvent) {
    e.preventDefault();

    this.canvas.setPointerCapture(e.pointerId);
    this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });

    const items = getNodes(this.items);
    this.selection = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const { x, y, width, height } = item.rect;
      const mo = toWorld(this.context, { x: e.offsetX, y: e.offsetY });
      if (mo.x >= x && mo.x <= x + width && mo.y >= y && mo.y <= y + height) {
        this.selection.push(i);
      }
    }
    this.selection = this.selection.reverse();
    this.selection = this.selection.slice(0, 1);

    new UpdateSelection(this.selection).dispatch(this);
  }

  onPointerUp(e: PointerEvent) {
    e.preventDefault();

    this.canvas.releasePointerCapture(e.pointerId);
    this.pointers.delete(e.pointerId);
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    const { scale } = matrixInfo(this.context);
    if (e.ctrlKey) {
      const scaleDelta = -e.deltaY * 0.01;
      if (
        scale + scaleDelta > this.minScale &&
        scale + scaleDelta < this.maxScale
      ) {
        new ZoomCanvas(scaleDelta).dispatch(this);
      }
    } else {
      const offset = { x: -e.deltaX * 2 * scale, y: -e.deltaY * 2 * scale };
      new PanCanvas(offset).dispatch(this);
    }
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

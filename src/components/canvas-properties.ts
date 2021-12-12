import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { UpdateNode } from "../commands";
import { svgShapes } from "../nodes/svg/svg";
import { colorNameToHex } from "../utils";

@customElement("canvas-properties")
export class CanvasProperties extends LitElement {
  static styles = css`
    section {
      width: var(--canvas-properties-width);
      height: var(--canvas-properties-height);
      background-color: var(--canvas-properties-background-color, #fff);
      color: var(--canvas-properties-color, #000);
      border-left: var(--canvas-properties-border-left, 1px solid #000);
      overflow-y: auto;
      padding: var(--canvas-properties-padding, 10px);
    }
    .property {
      margin-bottom: var(--canvas-properties-margin-bottom, 10px);
    }
  `;

  @property({ type: Array }) items: Element[] = [];
  @property({ type: Array }) selection: Element[] = [];

  render() {
    return html`<section>
      ${this.selection.length === 0
        ? this.renderEmptySelection()
        : this.selection.length === 1
        ? this.renderSingleSelection()
        : this.renderMultipleSelection()}
    </section>`;
  }

  renderEmptySelection() {
    return html` <h1>Properties</h1>
      <p>No selection</p>`;
  }

  renderSingleSelection() {
    const item = this.selection[this.selection.length - 1];
    const isShape = svgShapes.includes(item.tagName.toLowerCase());
    return html`<h2>${item.tagName}</h2>
      ${this.renderProperty("Description", "title", item, {
        type: "text",
      })}
      ${isShape ? this.renderShapeProperties(item) : ""} `;
  }

  renderMultipleSelection() {
    const items = this.selection;
    return html`
      <h1>Properties</h1>
      <ul>
        ${items.map((item) => html`<li>${item.tagName}</li>`)}
      </ul>
    `;
  }

  renderShapeProperties(element: Element) {
    return html`
      <h4>Position</h4>
      <form>
        ${this.renderProperty("X", "x", element, {
          type: "number",
        })}
        ${this.renderProperty("Y", "y", element, {
          type: "number",
        })}
        ${this.renderProperty("WIdth", "width", element, {
          type: "number",
        })}
        ${this.renderProperty("Height", "height", element, {
          type: "number",
        })}
      </form>
      <h4>Style</h4>
      <form>
        ${this.renderProperty("Background Color", "fill", element, {
          type: "color",
        })}
        ${this.renderProperty("Stroke Color", "stroke", element, {
          type: "color",
        })}
        ${this.renderProperty("Stroke Width", "stroke-width", element, {
          type: "number",
        })}
      </form>
    `;
  }

  renderProperty(
    label: string,
    key: string,
    element: Element,
    options?: {
      type?: "text" | "color" | "number";
      fallback?: string;
    }
  ) {
    let value = element.getAttribute(key) ?? options?.fallback ?? "";
    if (options?.type === "color" && !value.startsWith("#")) {
      value = colorNameToHex(value);
    }
    return html`<div class="property">
      <label for="${key}">${label}:</label>
      <input
        id="key"
        type="${options?.type ?? "text"}"
        .value="${value}"
        @input=${(e: Event) => {
          const input = e.target as HTMLInputElement;
          element.setAttribute(key, input.value);
          new UpdateNode(element).dispatch(this);
        }}
      />
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-properties": CanvasProperties;
  }
}

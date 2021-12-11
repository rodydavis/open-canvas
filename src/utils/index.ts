/**
 * X and y
 */
export interface Offset {
  x: number;
  y: number;
}

/**
 * Width and height
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Rect with offset and size
 */
export type Rect = Offset & Size;

export function getSizeFromElement(elem: Element) {
  const xAttr = elem.getAttribute("x");
  const yAttr = elem.getAttribute("y");
  const widthAttr = elem.getAttribute("width");
  const heightAttr = elem.getAttribute("height");
  if (elem instanceof HTMLElement || elem instanceof SVGElement) {
    const style = getComputedStyle(elem);
    return {
      x: xAttr ? pxToNumber(xAttr) : pxToNumber(style.left),
      y: yAttr ? pxToNumber(yAttr) : pxToNumber(style.top),
      width: widthAttr ? pxToNumber(widthAttr) : pxToNumber(style.width),
      height: heightAttr ? pxToNumber(heightAttr) : pxToNumber(style.height),
    };
  }
  const bounds = elem.getBoundingClientRect();
  return {
    x: xAttr ? pxToNumber(xAttr) : bounds.left,
    y: yAttr ? pxToNumber(yAttr) : bounds.top,
    width: widthAttr ? pxToNumber(widthAttr) : bounds.width,
    height: heightAttr ? pxToNumber(heightAttr) : bounds.height,
  };
}

export function getPxNumber(elem: HTMLElement, prop: string) {
  return pxToNumber(elem.style.getPropertyValue(prop));
}

export function pxToNumber(value: string) {
  return Number(value.replace("px", ""));
}

export function colorNameToHex(color: string) {
  const d = document.createElement("div");
  d.style.color = color;
  document.body.appendChild(d);
  const rgb = window.getComputedStyle(d).color;
  const [r, g, b] = rgb.match(/\d+/g)!.map((v) => parseInt(v, 10));
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };
  const hex = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
  document.body.removeChild(d);
  return hex;
}


export function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
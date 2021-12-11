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

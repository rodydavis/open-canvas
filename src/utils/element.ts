export function getSizeFromElement(elem: Element) {
  const xAttr = elem.getAttribute("x");
  const yAttr = elem.getAttribute("y");
  const widthAttr = elem.getAttribute("width");
  const heightAttr = elem.getAttribute("height");
  return {
    x: xAttr ? pxToNumber(xAttr) : 0,
    y: yAttr ? pxToNumber(yAttr) : 0,
    width: widthAttr ? pxToNumber(widthAttr) : 0,
    height: heightAttr ? pxToNumber(heightAttr) : 0,
  };
}

export function getPxNumber(elem: HTMLElement, prop: string) {
  return pxToNumber(elem.style.getPropertyValue(prop));
}

export function pxToNumber(value: string) {
  return Number(value.replace("px", ""));
}

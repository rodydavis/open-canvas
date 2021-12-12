export function pathLine(node: Element) {
  const x1 = Number(node.getAttribute("x1") ?? "0");
  const y1 = Number(node.getAttribute("y1") ?? "0");
  const x2 = Number(node.getAttribute("x2") ?? "0");
  const y2 = Number(node.getAttribute("y2") ?? "0");
  const path = new Path2D();
  path.moveTo(x1, y1);
  path.lineTo(x2, y2);
  return path;
}

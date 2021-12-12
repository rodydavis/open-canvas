export function pathPolygon(node: Element) {
  const points = node.getAttribute("points") ?? "";
  const pointsArray = points.split(" ");
  const path = new Path2D();
  for (const point of pointsArray) {
    const [x, y] = point.split(",");
    const pointX = Number(x);
    const pointY = Number(y);
    path.lineTo(pointX, pointY);
  }
  path.closePath();
  return path;
}

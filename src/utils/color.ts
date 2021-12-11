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

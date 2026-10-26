export function hexToColor(hex: string): string {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  const rgb = +r + g + b;
  const luminance = (rgb / (3 * 255)) * 100;

  return luminance < 50 ? "white" : "black";
}

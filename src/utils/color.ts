export function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}

export function hexToHSL(hex: string) {
  hex = hex.replace(/^#/, "");

  let bigint = parseInt(hex, 16);

  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let h;

  if (max == min) {
    h = 0;
  } else if (max == r) {
    h = ((g - b) / (max - min) + 6) % 6;
  } else if (max == g) {
    h = (b - r) / (max - min) + 2;
  } else {
    h = (r - g) / (max - min) + 4;
  }

  h = Math.round(h * 60);

  let s = Math.round(((max - min) / (1 - Math.abs(2 * max - 1))) * 100);
  let l = Math.round(((max + min) / 2) * 100);

  return [h, s, l];
}

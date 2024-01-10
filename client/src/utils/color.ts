export function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}

export function hexToHSL(hex: string) {
  let [r, g, b] = hexToRgb(hex);

  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let h, s, l;

  if (max === min) {
    h = 0;
    s = 0;
    l = Math.round(max * 100);
  } else {
    const delta = max - min;
    s = delta / (1 - Math.abs(2 * max - 1));
    l = (max + min) / 2;

    if (delta === 0) {
      h = 0;
    } else if (max === r) {
      h = ((g - b) / delta + 6) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
  }

  return [h, s, l];
}
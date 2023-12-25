function hexToRgb(hex: string) {
  // 16진수를 RGB로 변환
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function calculateContrast(color: number[], referenceColor: number[]) {
  // 각 색상 채널의 차이 계산
  const rDiff = color[0] - referenceColor[0];
  const gDiff = color[1] - referenceColor[1];
  const bDiff = color[2] - referenceColor[2];

  // 유클리드 거리 계산
  const distance = Math.sqrt(rDiff ** 2 + gDiff ** 2 + bDiff ** 2);

  return distance;
}

export function findContrastColor(
  baseColor: string,
  contrastColor1: number[] = [255, 255, 255],
  contrastColor2: number[] = [0, 0, 0]
) {
  // baseColor와의 대비를 계산
  const contrast1 = calculateContrast(hexToRgb(baseColor), contrastColor1);
  const contrast2 = calculateContrast(hexToRgb(baseColor), contrastColor2);

  // 대비가 높은 색상 반환
  return contrast1 > contrast2 ? "ffffff" : "000000";
}

// styles
import * as S from "./index.styles";

// utils
import { hexToRgb, hexToHSL } from "@/utils/color";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

interface IssueListItemProps {
  labelName: string;

  labelBgColor: string;
}

export function Label({ labelName, labelBgColor }: IssueListItemProps) {
  const [r, g, b] = hexToRgb(labelBgColor);
  const [h, s, l] = hexToHSL(labelBgColor);

  return (
    <S.LabelLayout
      style={{
        "--label-r": r,
        "--label-g": g,
        "--label-b": b,
        "--label-h": h,
        "--label-s": s,
        "--label-l": l,
      }}
    >
      <S.LabelBox>
        <S.LabelTextSpan>{labelName}</S.LabelTextSpan>
      </S.LabelBox>
    </S.LabelLayout>
  );
}

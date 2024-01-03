// styles
import { css } from "@emotion/react";

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
    <div
      style={{
        "--label-r": r,
        "--label-g": g,
        "--label-b": b,
        "--label-h": h,
        "--label-s": s,
        "--label-l": l,
      }}
      css={css`
        --border-threshold: 0.96;
        --lightness-threshold: 0.453;

        --perceived-lightness: calc(
          (
              (var(--label-r) * 0.2126) + (var(--label-g) * 0.7152) +
                (var(--label-b) * 0.0722)
            ) / 255
        );

        --border-alpha: max(
          0,
          min(
            calc((var(--perceived-lightness) - var(--border-threshold)) * 100),
            1
          )
        );

        --lightness-switch: max(
          0,
          min(
            calc(
              (1 / (var(--lightness-threshold) - var(--perceived-lightness)))
            ),
            1
          )
        );
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;

          background-color: rgb(var(--label-r), var(--label-g), var(--label-b));

          padding: 0 7px;

          border-radius: 2rem;

          border-width: 1px;
          border-style: solid;
          border-color: hsla(
            var(--label-h),
            calc(var(--label-s) * 1%),
            calc((var(--label-l) - 25) * 1%),
            var(--border-alpha)
          );
        `}
      >
        <span
          css={css`
            font-size: 12px;
            line-height: 18px;
            font-weight: 500;

            color: hsl(0deg, 0%, calc(var(--lightness-switch) * 100%));
          `}
        >
          {labelName}
        </span>
      </div>
    </div>
  );
}

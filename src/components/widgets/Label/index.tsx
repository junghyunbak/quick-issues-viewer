// styles
import { css } from "@emotion/react";

// utils
import { hexToRgb, hexToHSL } from "@/utils/color";

interface IssueListItemProps {
  labelName: string;
  labelBgColor: string;
}

export function Label({ labelName, labelBgColor }: IssueListItemProps) {
  const [r, g, b] = hexToRgb(labelBgColor);

  const [h, s, l] = hexToHSL(labelBgColor);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #${labelBgColor};

        padding: 0 7px;

        border-radius: 2rem;
        border: 1px solid
          hsla(
            ${h},
            calc(${s} * 1%),
            calc((${l} - 25) * 1%),
            max(
              0,
              min(
                calc(
                  (
                      calc(
                          ((${r} * 0.2126) + (${g} * 0.7152) + (${b} * 0.0722)) /
                            255
                        ) - 0.96
                    ) * 100
                ),
                1
              )
            )
          );
      `}
    >
      <span
        css={css`
          font-size: 12px;
          line-height: 18px;
          font-weight: 500;

          color: hsl(
            0deg,
            0%,
            calc(
              max(
                  0,
                  min(
                    calc(
                      (
                        1 /
                          (
                            0.453 -
                              calc(
                                (
                                    (${r} * 0.2126) + (${g} * 0.7152) +
                                      (${b} * 0.0722)
                                  ) / 255
                              )
                          )
                      )
                    ),
                    1
                  )
                ) * 100%
            )
          );
        `}
      >
        {labelName}
      </span>
    </div>
  );
}

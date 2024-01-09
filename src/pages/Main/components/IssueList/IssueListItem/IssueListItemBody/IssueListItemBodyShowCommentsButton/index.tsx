// react
import React from "react";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

interface IssueListItemBodyShowCommentsButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function IssueListItemBodyShowCommentsButton(
  props: IssueListItemBodyShowCommentsButtonProps
) {
  return (
    <div
      css={css`
        background-color: ${color.g100};

        border: 1px solid ${color.g200};
        border-radius: ${size.BORDER_RADIUS}px;

        margin-top: 0.75rem;

        cursor: pointer;

        padding: 0.3125rem 1rem;
      `}
      {...props}
    >
      <p
        css={css`
          text-align: center;
          font-weight: 600;
          font-size: 0.875rem;
        `}
      >
        Show comments
      </p>
    </div>
  );
}

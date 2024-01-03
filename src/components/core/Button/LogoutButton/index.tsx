// react
import React from "react";

// styles
import { css } from "@emotion/react";
import { size, color } from "@/assets/styles";

interface LogoutButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function LogoutButton(props: LogoutButtonProps) {
  return (
    <div
      css={css`
        padding: 0.5rem;

        border-radius: ${size.BORDER_RADIUS}px;

        cursor: pointer;

        &:hover {
          background-color: ${color.g100};
        }
      `}
      {...props}
    >
      <p
        css={css`
          font-size: 0.875rem;
          white-space: nowrap;
        `}
      >
        Logout
      </p>
    </div>
  );
}

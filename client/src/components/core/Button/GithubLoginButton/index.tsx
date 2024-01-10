// react
import React from "react";

// styles
import { css } from "@emotion/react";
import { size, color } from "@/assets/styles";

// svgs
import { ReactComponent as Github } from "@/assets/svgs/github.svg";

interface GithubLoginButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function GithubLoginButton(props: GithubLoginButtonProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.5rem;

        padding: 0.5rem;

        cursor: pointer;

        border-radius: ${size.BORDER_RADIUS}px;

        &:hover {
          background-color: ${color.g100};
        }
      `}
      {...props}
    >
      <Github
        css={css`
          width: 1rem;
          height: 1rem;
        `}
      />

      <p
        css={css`
          font-size: 0.875rem;
          white-space: nowrap;
        `}
      >
        Login
      </p>
    </div>
  );
}

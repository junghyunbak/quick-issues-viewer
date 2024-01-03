// styles
import { css } from "@emotion/react";
import { size, color } from "@/assets/styles";

// svgs
import { ReactComponent as Github } from "@/assets/svgs/github.svg";

export function GithubLoginButton() {
  const handleLoginButtonClick = async () => {
    localStorage.setItem("redirect_from", window.location.href);

    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=Iv1.1eb8f2908f40728f";
  };

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
      onClick={handleLoginButtonClick}
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

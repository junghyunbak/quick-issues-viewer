// react
import { useMemo, useState, useEffect } from "react";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// components
import { GithubLoginButton } from "@/components/core/Button/GithubLoginButton";

// apis
import { type RequestError } from "octokit";

interface ForbiddenProps {
  error: RequestError;
}

export function Forbidden({ error }: ForbiddenProps) {
  const [remainSecond, setRemainSecond] = useState(0);

  const resetDate = useMemo(() => {
    if (!error.response || !error.response.headers["x-ratelimit-reset"]) {
      const utcDate = new Date(new Date().toISOString());

      return utcDate;
    }

    return new Date(
      parseInt(error.response.headers["x-ratelimit-reset"], 10) * 1000
    );
  }, [error]);

  useEffect(() => {
    const timer = setInterval(() => {
      const utcDate = new Date(new Date().toISOString());

      const second = Math.ceil(
        (resetDate.getTime() - utcDate.getTime()) / 1000
      );

      setRemainSecond(second);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [resetDate, setRemainSecond]);

  useEffect(() => {
    if (remainSecond < 0) {
      window.location.reload();
    }
  }, [remainSecond]);

  const minute = Math.floor(Math.max(remainSecond, 0) / 60);
  const second = Math.max(Math.max(remainSecond, 0)) % 60;

  const handleLoginButtonClick = async () => {
    localStorage.setItem("redirect_from", window.location.href);

    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=Iv1.1eb8f2908f40728f";
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;

        padding: 2.5rem 1rem;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        `}
      >
        <h1>Ooops!</h1>

        <p
          css={css`
            color: ${color.inactive};
            font-size: 1.5rem;
          `}
        >
          Request quota exhausted for request
        </p>

        <p>
          Retrying after{" "}
          <span>{`${minute.toString().padStart(2, "0")}:${second
            .toString()
            .padStart(2, "0")}`}</span>
        </p>

        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `}
        >
          <p
            css={css`
              font-size: 0.875rem;
            `}
          >
            You can continue to use it by logging in.
          </p>

          <GithubLoginButton
            css={css`
              border: 1px solid ${color.g200};
              border-radius: ${size.BORDER_RADIUS}px;
            `}
            onClick={handleLoginButtonClick}
          />
        </div>
      </div>
    </div>
  );
}

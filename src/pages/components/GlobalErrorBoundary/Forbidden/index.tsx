// react
import { useMemo, useState, useEffect, useCallback } from "react";
import { type FallbackProps } from "react-error-boundary";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// apis
import { type RequestError } from "octokit";

interface ForbiddenProps {
  error: RequestError;

  resetErrorBoundary: FallbackProps["resetErrorBoundary"];
}

export function Forbidden({ error, resetErrorBoundary }: ForbiddenProps) {
  const resetDate = useMemo(() => {
    if (!error.headers["x-ratelimit-reset"]) {
      return new Date();
    }

    return new Date(parseInt(error.headers["x-ratelimit-reset"], 10) * 1000);
  }, [error]);

  const [remainSecond, setRemainSecond] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const ms =
        resetDate.getTime() - new Date(new Date().toISOString()).getTime();

      const s = Math.ceil(ms / 1000);

      if (s < 0) {
        return;
      }

      setRemainSecond(s);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [resetDate, setRemainSecond]);

  const handleRetryButtonClick = useCallback(() => {
    resetErrorBoundary();
  }, [resetErrorBoundary]);

  const minute = Math.floor(remainSecond / 60);
  const second = remainSecond % 60;

  const isReset = remainSecond === 0;

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
          요청 최대 횟수를 초과하였습니다.
        </p>

        <p>
          남은 시간:{" "}
          <span>{`${minute.toString().padStart(2, "0")}분 ${second
            .toString()
            .padStart(2, "0")}초`}</span>
        </p>

        <button
          type="button"
          css={css`
            padding: 0.3125rem 1rem;

            border: 1px solid ${color.g200};
            border-radius: ${size.BORDER_RADIUS}px;

            background-color: ${color.g100};

            font-weight: 500;
            color: ${isReset ? color.active : color.inactive};

            cursor: ${isReset ? "pointer" : "auto"};
          `}
          onClick={handleRetryButtonClick}
          disabled={!isReset}
        >
          retry
        </button>
      </div>
    </div>
  );
}

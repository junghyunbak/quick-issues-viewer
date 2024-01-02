// react
import { useMemo, useState, useEffect } from "react";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

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
      </div>
    </div>
  );
}

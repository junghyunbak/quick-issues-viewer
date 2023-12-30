// react
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

// components
import { Header } from "@/components/widgets/Header";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// apis
import { type RequestError } from "octokit";

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

interface ErrorFallbackProps extends FallbackProps {
  error: RequestError;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const handleGoHomeButtonClick = useCallback(() => {
    switch (error.status) {
      case 403:
        resetErrorBoundary();

        break;

      case 404:
      case 422:
      default:
        window.location.href = "/";

        break;
    }
  }, [error, resetErrorBoundary]);

  const errorMessage = useMemo(() => {
    switch (error.status) {
      case 403:
        return "요청 최대 횟수를 초과하였습니다.";

      case 404:
      case 422:
        return "잘못된 레포지토리 정보를 입력하였습니다.";

      default:
        return "알 수 없는 오류가 발생했습니다.";
    }
  }, [error]);

  const buttonMessage = useMemo(() => {
    switch (error.status) {
      case 403:
        return "retry";

      case 404:
      case 422:
      default:
        return "go home";
    }
  }, [error]);

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

  const minute = Math.floor(remainSecond / 60);
  const second = remainSecond % 60;

  const isReset = error.status !== 403 || remainSecond === 0;

  return (
    <FixedAndVariableLayout
      direction="column"
      fixedElement={
        <div
          css={css`
            border-bottom: 1px solid ${color.g200};
          `}
        >
          <Header />
        </div>
      }
      variableElement={
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
              {errorMessage}
            </p>

            {error.status === 403 && (
              <p>
                남은 시간:{" "}
                <span>{`${minute.toString().padStart(2, "0")}분 ${second
                  .toString()
                  .padStart(2, "0")}초`}</span>
              </p>
            )}

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
              onClick={handleGoHomeButtonClick}
              disabled={!isReset}
            >
              {buttonMessage}
            </button>
          </div>
        </div>
      }
    />
  );
}

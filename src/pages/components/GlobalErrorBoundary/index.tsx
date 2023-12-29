// react
import React, { useMemo } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

// components
import { Header } from "@/components/widgets/Header";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}

function Fallback({ error }: FallbackProps) {
  const handleGoHomeButtonClick = () => {
    window.location.href = "/";
  };

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

            <button
              type="button"
              css={css`
                padding: 0.3125rem 1rem;

                border: 1px solid ${color.g200};
                border-radius: ${size.BORDER_RADIUS}px;

                background-color: ${color.g100};

                font-weight: 500;
                color: ${color.active};

                cursor: pointer;
              `}
              onClick={handleGoHomeButtonClick}
            >
              go home
            </button>
          </div>
        </div>
      }
    />
  );
}

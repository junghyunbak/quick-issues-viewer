// react
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHomeButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

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
          페이지를 찾을 수 없습니다.
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
  );
}

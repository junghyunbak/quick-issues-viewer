// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

export function SearchModalFooter() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-end;

        border-top: 1px solid ${color.g200};

        padding: 0.5rem 0.75rem;
      `}
    >
      <p
        css={css`
          font-size: 0.75rem;
        `}
      >
        <b>repository</b>: change url path
      </p>
    </div>
  );
}

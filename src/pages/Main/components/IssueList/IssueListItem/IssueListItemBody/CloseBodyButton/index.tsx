// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

// svgs
import { ReactComponent as X } from "@/assets/svgs/x.svg";

export function CloseBodyButton() {
  return (
    <div
      css={css`
        position: sticky;
        bottom: 0;

        z-index: 5;

        padding-top: 1.75rem;
        padding-bottom: 1rem;
      `}
    >
      <div
        css={css`
          width: 2.5rem;
          height: 2.5rem;

          border: 1px solid ${color.g200};
          border-radius: 9999px;

          background-color: ${color.w};

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <X />
      </div>
    </div>
  );
}

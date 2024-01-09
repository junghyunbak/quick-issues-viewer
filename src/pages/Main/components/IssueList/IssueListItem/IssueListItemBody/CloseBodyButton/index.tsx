// styles
import { css } from "@emotion/react";
import { color, zIndex } from "@/assets/styles";

// svgs
import { ReactComponent as X } from "@/assets/svgs/x.svg";

interface CloseBodyButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function CloseBodyButton(props: CloseBodyButtonProps) {
  return (
    <div
      css={css`
        position: sticky;
        bottom: 0;

        z-index: ${zIndex.ISSUE_ITEM_BODY_CLOSE_BUTTON};

        padding-top: 1.75rem;
        padding-bottom: 1rem;
      `}
      {...props}
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

          box-shadow: rgba(140, 149, 159, 0.2) 0px 8px 24px 0px;
        `}
      >
        <X />
      </div>
    </div>
  );
}

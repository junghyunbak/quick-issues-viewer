// react
import React, { useCallback } from "react";

// styles
import { css } from "@emotion/react";
import { color, device, size } from "@/assets/styles";

// components
import { LabelList } from "../../LabelList";

// svgs
import { ReactComponent as X } from "@/assets/svgs/x.svg";

interface LabelListModalProps {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LabelListModal({ setMenuIsOpen }: LabelListModalProps) {
  const handleDimmedClick = useCallback(() => {
    setMenuIsOpen(false);
  }, [setMenuIsOpen]);

  return (
    <div
      css={css`
        position: fixed;
        inset: 0;
      `}
    >
      <div
        css={css`
          position: absolute;
          inset: 0;

          background-color: rgba(0, 0, 0, 0.35);
        `}
        onClick={handleDimmedClick}
      />

      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;

          width: 100%;
          max-width: ${size.SIDEBAR_WIDTH}px;
          height: 100%;

          background-color: ${color.w};
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-end;

            border-bottom: 1px solid ${color.g200};

            padding: 0.5rem;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;

              padding: 0.5rem;

              border-radius: ${size.BORDER_RADIUS}px;

              cursor: pointer;

              &:hover {
                @media ${device.canHover} {
                  background-color: ${color.g100};
                }
              }
            `}
            onClick={handleDimmedClick}
          >
            <X />
          </div>
        </div>
        <LabelList />
      </div>
    </div>
  );
}

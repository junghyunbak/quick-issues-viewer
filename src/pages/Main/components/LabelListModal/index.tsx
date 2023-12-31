// react
import React, { useCallback } from "react";

// styles
import { css } from "@emotion/react";
import { color, device, size, zIndex } from "@/assets/styles";

// components
import { LabelList } from "@/pages/Main/components/LabelList";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";

// svgs
import { ReactComponent as X } from "@/assets/svgs/x.svg";

interface LabelListModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LabelListModal({ setIsOpen }: LabelListModalProps) {
  const handleDimmedClick = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <div
      css={css`
        position: fixed;
        inset: 0;

        z-index: ${zIndex.LABEL_LIST_MODAL};
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
        <FixedAndVariableLayout
          direction="column"
          fixedElement={
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: flex-end;

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
          }
          variableElement={<LabelList />}
        />
      </div>
    </div>
  );
}

// react
import { useState, useCallback } from "react";

// components
import { LabelListModal } from "@/pages/Main/components/MobileLableListController/LabelListModal";

// styles
import { css } from "@emotion/react";
import { device, size, color } from "@/assets/styles";

// svgs
import { ReactComponent as Hamburger } from "@/assets/svgs/hamburger.svg";

export function MobileLableListController() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuButtonClick = useCallback(() => {
    setMenuIsOpen((prev) => {
      return !prev;
    });
  }, [setMenuIsOpen]);

  return (
    <div
      css={css`
        display: flex;

        @media ${device.pc} {
          display: none;
        }

        width: 100%;

        padding: 0.5rem;
        padding-top: 0;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0.5rem;

          cursor: pointer;

          border-radius: ${size.BORDER_RADIUS}px;

          &:hover {
            @media ${device.canHover} {
              background-color: ${color.g100};
            }
          }
        `}
        onClick={handleMenuButtonClick}
      >
        <Hamburger />
      </div>

      {menuIsOpen && <LabelListModal setMenuIsOpen={setMenuIsOpen} />}
    </div>
  );
}

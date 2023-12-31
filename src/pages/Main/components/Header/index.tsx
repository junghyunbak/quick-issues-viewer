// react
import { useState, Fragment } from "react";

// components
import { Search } from "@/components/widgets/Search";
import { LabelListModal } from "@/pages/Main/components/LabelListModal";

// styles
import { css } from "@emotion/react";
import { size, color, device } from "@/assets/styles";

// svgs
import { ReactComponent as Hamburger } from "@/assets/svgs/hamburger.svg";

export function Header() {
  const [labelListModalIsOpen, setLabelListModalIsOpen] = useState(false);

  const handleMemuButtonClick = () => {
    setLabelListModalIsOpen(true);
  };

  return (
    <Fragment>
      <div
        css={css`
          display: flex;
          justify-content: space-between;

          padding: 1rem;

          border-bottom: 1px solid ${color.g200};
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

            @media ${device.pc} {
              visibility: hidden;
            }
          `}
          onClick={handleMemuButtonClick}
        >
          <Hamburger />
        </div>

        <Search />
      </div>

      {labelListModalIsOpen && (
        <LabelListModal setIsOpen={setLabelListModalIsOpen} />
      )}
    </Fragment>
  );
}

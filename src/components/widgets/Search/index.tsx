// react
import { useCallback, useState, Fragment } from "react";

// styles
import { css } from "@emotion/react";
import { size, color } from "@/assets/styles";

// svgs
import { ReactComponent as Magnifier } from "@/assets/svgs/magnifier.svg";

// components
import { SearchModal } from "./SearchModal";

export function Search() {
  const [modalIsOpen, setIsModalOpen] = useState(false);

  const handleSearchButtonClick = useCallback(() => {
    setIsModalOpen((prevState) => {
      return !prevState;
    });
  }, [setIsModalOpen]);

  return (
    <Fragment>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;

          width: 2rem;
          height: 2rem;

          border-radius: ${size.BORDER_RADIUS}px;
          border: 1px solid ${color.g200};

          background-color: ${color.g100};

          cursor: pointer;
        `}
        onClick={handleSearchButtonClick}
      >
        <Magnifier />
      </div>

      {modalIsOpen && <SearchModal setIsModalOpen={setIsModalOpen} />}
    </Fragment>
  );
}

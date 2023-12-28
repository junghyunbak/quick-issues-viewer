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

          height: 2rem;

          border-radius: ${size.BORDER_RADIUS}px;
          border: 1px solid ${color.g200};

          overflow: hidden;

          cursor: pointer;
        `}
        onClick={handleSearchButtonClick}
      >
        <div
          css={css`
            display: flex;
            align-items: center;

            height: 100%;

            padding: 0 0.75rem;

            border-right: 1px solid ${color.g200};
          `}
        >
          <p
            css={css`
              font-size: 0.875rem;
              color: ${color.g600};
            `}
          >
            Find Repository
          </p>
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;

            width: 2rem;
            height: 100%;

            background-color: ${color.g100};
          `}
        >
          <Magnifier />
        </div>
      </div>

      {modalIsOpen && <SearchModal setIsModalOpen={setIsModalOpen} />}
    </Fragment>
  );
}

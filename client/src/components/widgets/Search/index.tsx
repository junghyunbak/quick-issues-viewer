// react
import { useCallback, useState, Fragment } from "react";

// styles
import * as S from "./index.styles";

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
      <S.SearchButtonLayout onClick={handleSearchButtonClick}>
        <S.SearchButtonTextBox>
          <S.SearchButtonTextParagraph>
            Find Repository
          </S.SearchButtonTextParagraph>
        </S.SearchButtonTextBox>

        <S.SearchButtonIconBox>
          <S.Magnifier />
        </S.SearchButtonIconBox>
      </S.SearchButtonLayout>

      {modalIsOpen && <SearchModal setIsModalOpen={setIsModalOpen} />}
    </Fragment>
  );
}

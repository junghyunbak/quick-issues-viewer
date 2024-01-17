// react
import { useCallback, useState } from "react";
import { ModalContextProvider } from "./index.context";

// styles
import * as S from "./index.styles";

// components
import { SearchModal } from "./SearchModal";

export function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchButtonClick = useCallback(() => {
    setIsModalOpen((prevState) => {
      return !prevState;
    });
  }, [setIsModalOpen]);

  return (
    <ModalContextProvider value={{ isModalOpen, setIsModalOpen }}>
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

      {isModalOpen && <SearchModal />}
    </ModalContextProvider>
  );
}

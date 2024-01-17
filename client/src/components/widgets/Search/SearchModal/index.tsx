// react
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { InputContextProvider } from "./index.context";
import { ModalContext } from "../index.context";

// styles
import * as S from "./index.styles";

// components
import { SearchModalRepoList } from "./SearchModalRepoList";
import { SearchModalUserList } from "./SearchModalUserList";
import { SearchModalInput } from "./SearchModalInput";
import { SearchModalFooter } from "./SearchModalFooter";
import { SearchModalHistory } from "./SearchModalHistory";

export function SearchModal() {
  const { setIsModalOpen } = useContext(ModalContext);

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setSearchValue(inputValue);
    }, 500);
  }, [inputValue]);

  const handleDimmedClick = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <InputContextProvider value={{ inputValue, setInputValue }}>
      <S.SearchModalLayout>
        <S.SearchModalDimmedBox onClick={handleDimmedClick} />

        <S.SearchModalContentBox>
          <SearchModalInput />

          <S.SearchModalContentSearchResultBox>
            {inputValue === "" ? (
              <SearchModalHistory />
            ) : (
              <Fragment>
                <SearchModalUserList searchValue={searchValue} />
                <SearchModalRepoList searchValue={searchValue} />
              </Fragment>
            )}
          </S.SearchModalContentSearchResultBox>

          <SearchModalFooter />
        </S.SearchModalContentBox>
      </S.SearchModalLayout>
    </InputContextProvider>
  );
}

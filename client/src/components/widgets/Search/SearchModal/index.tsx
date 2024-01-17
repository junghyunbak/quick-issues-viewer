// react
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// styles
import * as S from "./index.styles";

// components
import { SearchModalRepoList } from "./SearchModalRepoList";
import { SearchModalUserList } from "./SearchModalUserList";
import { SearchModalInput } from "./SearchModalInput";
import { SearchModalFooter } from "./SearchModalFooter";
import { SearchModalHistory } from "./SearchModalHistory";

interface SearchModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModal({ setIsModalOpen }: SearchModalProps) {
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
    <S.SearchModalLayout>
      <S.SearchModalDimmedBox onClick={handleDimmedClick} />

      <S.SearchModalContentBox>
        <SearchModalInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        <S.SearchModalContentSearchResultBox>
          {inputValue === "" ? (
            <SearchModalHistory
              setInputValue={setInputValue}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <Fragment>
              <SearchModalUserList
                searchValue={searchValue}
                setInputValue={setInputValue}
              />

              <SearchModalRepoList
                inputValue={inputValue}
                searchValue={searchValue}
                setIsModalOpen={setIsModalOpen}
              />
            </Fragment>
          )}
        </S.SearchModalContentSearchResultBox>

        <SearchModalFooter />
      </S.SearchModalContentBox>
    </S.SearchModalLayout>
  );
}

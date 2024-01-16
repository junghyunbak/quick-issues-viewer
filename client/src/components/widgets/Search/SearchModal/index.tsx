// react
import React, { useCallback, useEffect, useRef, useState } from "react";

// styles
import * as S from "./index.styles";

// components
import { SearchModalRepoList } from "./SearchModalRepoList";
import { SearchModalUserList } from "./SearchModalUserList";
import { SearchModalInput } from "./SearchModalInput";
import { SearchModalFooter } from "./SearchModalFooter";

interface SearchModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModal({ setIsModalOpen }: SearchModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const searchKeyword = localStorage.getItem("searchKeyword");

    if (!searchKeyword) {
      return;
    }

    setInputValue(searchKeyword);
    setSearchValue(searchKeyword);
  }, []);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem("searchKeyword", inputValue);

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
          <SearchModalUserList
            searchValue={searchValue}
            setInputValue={setInputValue}
          />

          <SearchModalRepoList
            inputValue={inputValue}
            searchValue={searchValue}
            setIsModalOpen={setIsModalOpen}
          />
        </S.SearchModalContentSearchResultBox>

        <SearchModalFooter />
      </S.SearchModalContentBox>
    </S.SearchModalLayout>
  );
}

// react
import React, { useCallback, useEffect, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";

// zustand
import useStore from "@/store";

// styles
import * as S from "./index.styles";

interface SearchModalInputProps {
  inputValue: string;

  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchModalInput({
  inputValue,
  setInputValue,
}: SearchModalInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [repoSearching, userSearching] = useStore((state) => [
    state.repoSearching,
    state.userSearching,
  ]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  return (
    <S.SearchInputLayout>
      <S.SearchInputLabel>
        <S.Magnifier />

        <S.SearchInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="{owner}/{repo}"
        />

        {(repoSearching || userSearching) && (
          <RotatingLines width="16px" strokeColor="gray" />
        )}
      </S.SearchInputLabel>
    </S.SearchInputLayout>
  );
}

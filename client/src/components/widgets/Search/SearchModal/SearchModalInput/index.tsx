// react
import React, { useCallback, useEffect, useRef } from "react";

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
      </S.SearchInputLabel>
    </S.SearchInputLayout>
  );
}

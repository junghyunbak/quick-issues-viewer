// react
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import { InputContext } from "@/components/widgets/Search/SearchModal/index.context";

// zustand
import useStore from "@/store";

// styles
import * as S from "./index.styles";

export function SearchModalInput() {
  const { inputRef, inputValue, setInputValue } = useContext(InputContext);

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

  const handleTextRemoveButtonClick = useCallback(() => {
    setInputValue("");
  }, [setInputValue]);

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

        <S.SearchInputUtilBox>
          {(repoSearching || userSearching) && (
            <RotatingLines width="1rem" strokeColor="gray" />
          )}

          {inputValue !== "" && (
            <S.CircleX onClick={handleTextRemoveButtonClick} />
          )}
        </S.SearchInputUtilBox>
      </S.SearchInputLabel>
    </S.SearchInputLayout>
  );
}

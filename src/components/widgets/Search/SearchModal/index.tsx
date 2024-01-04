// react
import React, { useCallback, useEffect, useRef, useState } from "react";

// styles
import { css } from "@emotion/react";
import { color, device, size, zIndex } from "@/assets/styles";

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
    <div
      css={css`
        position: fixed;
        inset: 0;

        display: flex;
        flex-direction: column;
        align-items: center;

        z-index: ${zIndex.SEARCH_MODAL};
      `}
    >
      <div
        css={css`
          position: absolute;
          inset: 0;

          background-color: rgba(0, 0, 0, 0.35);
        `}
        onClick={handleDimmedClick}
      />

      <div
        css={css`
          position: absolute;

          display: flex;
          flex-direction: column;

          width: ${size.BREAKPOINT_TABLET}px;
          max-height: 80%;

          @media ${device.mobile} {
            width: 90%;
          }

          background-color: ${color.w};

          border: 1px solid ${color.g200};
          border-radius: ${size.BORDER_RADIUS * 2}px;

          margin-top: 1%;
        `}
      >
        <SearchModalInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        <div
          css={css`
            overflow-y: auto;

            & > div {
              border-bottom: 1px solid ${color.g200};

              &:last-child {
                border-bottom: 0;
              }

              padding: 0.75rem;

              &:first-of-type {
                padding-top: 0;
              }
            }
          `}
        >
          <SearchModalUserList
            searchValue={searchValue}
            setInputValue={setInputValue}
          />

          <SearchModalRepoList
            inputValue={inputValue}
            searchValue={searchValue}
            setIsModalOpen={setIsModalOpen}
          />
        </div>

        <SearchModalFooter />
      </div>
    </div>
  );
}

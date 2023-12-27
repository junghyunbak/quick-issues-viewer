// react
import React, { useCallback, useEffect, useRef, useState } from "react";

// styles
import { css } from "@emotion/react";
import { color, device, size, zIndex } from "@/assets/styles";

// svgs
import { ReactComponent as Magnifier } from "@/assets/svgs/magnifier.svg";

// components
import { SearchModalRepoList } from "./SearchModalRepoList";
import { SearchModalUserList } from "./SearchModalUserList";

interface SearchModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModal({ setIsModalOpen }: SearchModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const searchKeyword = localStorage.getItem("searchKeyword");

    if (!searchKeyword) {
      return;
    }

    setInputValue(searchKeyword);
    setSearchValue(searchKeyword);

    inputRef.current?.focus();
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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;

        z-index: ${zIndex.SEARCH_MODAL};

        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 100%;

          background-color: rgba(0, 0, 0, 0.35);
        `}
        onClick={handleDimmedClick}
      />

      <div
        css={css`
          position: absolute;

          width: ${size.BREAKPOINT_TABLET}px;
          max-height: 90%;

          overflow-y: auto;

          @media ${device.mobile} {
            width: 90%;
          }

          background-color: ${color.w};

          border: 1px solid ${color.g200};
          border-radius: ${size.BORDER_RADIUS * 2}px;

          margin-top: 1%;
        `}
      >
        <div
          css={css`
            padding: 0.75rem;
          `}
        >
          <label
            css={css`
              display: flex;
              align-items: center;

              border: 1px solid ${color.g200};
              border-radius: ${size.BORDER_RADIUS}px;

              padding: 0.5rem;

              gap: 0.25rem;
            `}
          >
            <Magnifier />

            <input
              css={css`
                width: 100%;

                outline: none;
                border: 0;
              `}
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="{owner}/{repo}"
            />
          </label>
        </div>

        <div
          css={css`
            & > div {
              border-bottom: 1px solid ${color.g200};

              &:last-child {
                border-bottom: 0;
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
      </div>
    </div>
  );
}

// react
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

// styles
import { css } from "@emotion/react";
import { color, device, size, zIndex } from "@/assets/styles";

// svgs
import { ReactComponent as Magnifier } from "@/assets/svgs/magnifier.svg";

// components
import { SearchModalRepoList } from "./SearchModalRepoList";

// apis
import { apiSevice } from "@/apis";

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

  const [searchOwner] = searchValue.split("/");

  const repoList = useQuery(["search", searchOwner], async () => {
    if (searchOwner === "") {
      return null;
    }

    try {
      const repoList = await apiSevice.getRepoList(searchOwner);

      return repoList;
    } catch (e) {
      return null;
    }
  });

  const handleDimmedClick = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);

      localStorage.setItem("searchKeyword", e.target.value);

      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        setSearchValue(e.target.value);
      }, 500);
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
            padding: 1.25rem;
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
              placeholder="organization or username"
            />
          </label>
        </div>

        {repoList.data && (
          <SearchModalRepoList
            repoList={repoList.data}
            inputValue={inputValue}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  );
}

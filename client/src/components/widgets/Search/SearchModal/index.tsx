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

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const modalRef = useRef<HTMLDivElement | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setSearchValue(inputValue);
    }, 500);
  }, [inputValue]);

  useEffect(() => {
    const KeyDownListener = (e: KeyboardEvent) => {
      if (!modalRef.current) {
        return;
      }

      switch (e.code) {
        case "ArrowLeft":
        case "ArrowRight":
          if (!inputRef.current) {
            break;
          }

          if (inputRef.current !== document.activeElement) {
            inputRef.current.focus();
          }

          break;

        case "ArrowDown":
        case "ArrowUp":
          const items = Array.from(modalRef.current.querySelectorAll("li"));

          if (!items.length) {
            break;
          }

          const focusItem = document.activeElement;

          const index = !(focusItem instanceof HTMLLIElement)
            ? -1
            : items.indexOf(focusItem);

          if (index === -1) {
            const nextIndex = e.code === "ArrowDown" ? 0 : items.length - 1;

            items[nextIndex].focus();
          } else {
            const nextIndex =
              e.code === "ArrowDown"
                ? (index + 1) % items.length
                : (index - 1 + items.length) % items.length;

            items[nextIndex].focus();
          }

          break;

        case "Enter":
          const li = document.activeElement;

          if (li instanceof HTMLLIElement) {
            li.click();
          }

          break;

        case "Escape":
          setInputValue("");

          break;
      }
    };

    window.addEventListener("keydown", KeyDownListener);

    return () => {
      window.removeEventListener("keydown", KeyDownListener);
    };
  }, [modalRef, setInputValue, inputRef]);

  const handleDimmedClick = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <InputContextProvider value={{ inputRef, inputValue, setInputValue }}>
      <S.SearchModalLayout ref={modalRef}>
        <S.SearchModalDimmedBox onClick={handleDimmedClick} />

        <S.SearchModalContentBox>
          <SearchModalInput />

          <S.SearchModalContentSearchResultBox
            onKeyDown={(e) => {
              e.preventDefault();
            }}
          >
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

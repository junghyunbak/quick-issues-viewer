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
        case "ArrowDown":
        case "ArrowUp":
          const items = Array.from(modalRef.current.querySelectorAll("li"));

          if (!items.length) {
            return;
          }

          const focusItem = document.activeElement;

          const index = !(focusItem instanceof HTMLLIElement)
            ? -1
            : items.indexOf(focusItem);

          if (index === -1) {
            items[0].focus();
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
      }
    };

    window.addEventListener("keydown", KeyDownListener);

    return () => {
      window.removeEventListener("keydown", KeyDownListener);
    };
  }, [modalRef]);

  const handleDimmedClick = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <InputContextProvider value={{ inputValue, setInputValue }}>
      <S.SearchModalLayout ref={modalRef}>
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

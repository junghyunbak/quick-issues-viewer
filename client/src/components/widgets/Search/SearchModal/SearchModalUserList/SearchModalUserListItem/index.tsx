// react
import { useCallback, useContext } from "react";
import { InputContext } from "../../index.context";

// styles
import * as S from "./index.styles";

// zustand
import useStore from "@/store";

interface SearchModalUserListItemProps {
  id: number;
  login: string;
  avatar_url: string;
}

export function SearchModalUserListItem({
  id,
  login,
  avatar_url,
}: SearchModalUserListItemProps) {
  const { setInputValue } = useContext(InputContext);

  const [setSearchHistory] = useStore((state) => [state.setSearchHistory]);

  const handleUserItemClick = useCallback(() => {
    setSearchHistory((prev) => {
      const newSearchHistory = [...prev];

      const searchHistoryElement = newSearchHistory.find(
        (searchHistory) => searchHistory.id === id
      );

      if (searchHistoryElement) {
        searchHistoryElement.createAt = Date.now();

        return newSearchHistory;
      }

      newSearchHistory.push({
        id,
        type: "user",
        url: avatar_url,
        name: login,
        createAt: Date.now(),
      });

      return newSearchHistory;
    });

    setInputValue(`${login}/`);
  }, [setInputValue, setSearchHistory, id, login, avatar_url]);

  return (
    <S.SearchModalUserListItem onClick={handleUserItemClick} tabIndex={0}>
      <S.SearchModalUserListItemImage
        src={avatar_url}
      ></S.SearchModalUserListItemImage>

      <S.SearchModalUserListItemParagraph>
        {login}
      </S.SearchModalUserListItemParagraph>
    </S.SearchModalUserListItem>
  );
}

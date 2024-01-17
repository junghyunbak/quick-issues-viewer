// react
import { useCallback } from "react";

// styles
import * as S from "./index.styles";

// zustand
import useStore from "@/store";

interface SearchModalUserListItemProps {
  id: number;
  login: string;
  avatar_url: string;

  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchModalUserListItem({
  id,
  login,
  avatar_url,
  setInputValue,
}: SearchModalUserListItemProps) {
  const [setSearchHistory] = useStore((state) => [state.setSearchHistory]);

  const handleUserItemClick = useCallback(() => {
    setSearchHistory((prev) => {
      const newSearchHistory = [...prev];

      const searchHistoryElement = newSearchHistory.find(
        (searchHistory) => searchHistory.id === id
      );

      if (searchHistoryElement) {
        searchHistoryElement.createAt = new Date();

        return newSearchHistory;
      }

      newSearchHistory.push({
        id,
        type: "user",
        url: avatar_url,
        name: login,
        createAt: new Date(),
      });

      return newSearchHistory;
    });

    /**
     * inputValue가 변경되어도 검색이 다시 발생하지 않는 이슈가 존재
     */
    setInputValue(`${login}/`);
  }, [setInputValue, login]);

  return (
    <S.SearchModalUserListItemLayout onClick={handleUserItemClick}>
      <S.SearchModalUserListItemImage
        src={avatar_url}
      ></S.SearchModalUserListItemImage>

      <S.SearchModalUserListItemParagraph>
        {login}
      </S.SearchModalUserListItemParagraph>
    </S.SearchModalUserListItemLayout>
  );
}

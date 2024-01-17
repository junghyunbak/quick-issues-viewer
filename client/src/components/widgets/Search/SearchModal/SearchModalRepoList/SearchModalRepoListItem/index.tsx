// react
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// zustand
import useStore from "@/store";

// styles
import * as S from "./index.styles";

interface SearchModalItemProps {
  id: number;

  full_name: string;

  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModalRepoListItem({
  id,
  full_name,
  setIsModalOpen,
}: SearchModalItemProps) {
  const navigate = useNavigate();

  const [setSearchHistory] = useStore((state) => [state.setSearchHistory]);

  const handleItemClick = useCallback(() => {
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
        type: "repo",
        name: full_name,
        createAt: new Date(),
      });

      return newSearchHistory;
    });

    const [owner, repo] = full_name.split("/");

    navigate(`/${owner}/${repo}`);

    setIsModalOpen(false);
  }, [navigate, id, full_name, setIsModalOpen, setSearchHistory]);

  return (
    <S.SearchModalRepoListItem onClick={handleItemClick}>
      <S.Repository />

      <S.SearchModalRepoListItemParagraph>
        {full_name}
      </S.SearchModalRepoListItemParagraph>
    </S.SearchModalRepoListItem>
  );
}

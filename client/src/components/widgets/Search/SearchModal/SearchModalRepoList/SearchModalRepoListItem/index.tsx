// react
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "@/components/widgets/Search/index.context";

// zustand
import useStore from "@/store";

// styles
import * as S from "./index.styles";

interface SearchModalItemProps {
  id: number;

  fullName: string;
}

export function SearchModalRepoListItem({
  id,
  fullName,
}: SearchModalItemProps) {
  const { setIsModalOpen } = useContext(ModalContext);

  const navigate = useNavigate();

  const [setSearchHistory] = useStore((state) => [state.setSearchHistory]);

  const handleItemClick = useCallback(() => {
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
        type: "repo",
        name: fullName,
        createAt: Date.now(),
      });

      return newSearchHistory;
    });

    const [owner, repo] = fullName.split("/");

    navigate(`/${owner}/${repo}`);

    setIsModalOpen(false);
  }, [navigate, id, fullName, setIsModalOpen, setSearchHistory]);

  return (
    <S.SearchModalRepoListItem onClick={handleItemClick} tabIndex={0}>
      <S.Repository />

      <S.SearchModalRepoListItemParagraph>
        {fullName}
      </S.SearchModalRepoListItemParagraph>
    </S.SearchModalRepoListItem>
  );
}

// react
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// styles
import * as S from "./index.styles";

// apis
import { type components } from "@octokit/openapi-types";

interface SearchModalItemProps {
  repository: components["schemas"]["minimal-repository"];

  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModalRepoListItem({
  repository,
  setIsModalOpen,
}: SearchModalItemProps) {
  const navigate = useNavigate();

  const handleItemClick = useCallback(() => {
    const [owner, repo] = repository.full_name.split("/");

    navigate(`/${owner}/${repo}`);

    setIsModalOpen(false);
  }, [navigate, repository, setIsModalOpen]);

  return (
    <S.SearchModalRepoListItem onClick={handleItemClick}>
      <S.Repository />

      <S.SearchModalRepoListItemParagraph>
        {repository.full_name}
      </S.SearchModalRepoListItemParagraph>
    </S.SearchModalRepoListItem>
  );
}

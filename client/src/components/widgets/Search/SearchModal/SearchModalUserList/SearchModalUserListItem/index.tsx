// react
import { useCallback } from "react";

// styles
import * as S from "./index.styles";

// apis
import { type components } from "@octokit/openapi-types";

interface SearchModalUserListItemProps {
  user: components["schemas"]["user-search-result-item"];

  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchModalUserListItem({
  user,
  setInputValue,
}: SearchModalUserListItemProps) {
  const { login, avatar_url } = user;

  const handleUserItemClick = useCallback(() => {
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

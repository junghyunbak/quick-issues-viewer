// react
import { useCallback } from "react";

// styles
import { css } from "@emotion/react";
import { device, size, color } from "@/assets/styles";

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
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.375rem;

        cursor: pointer;

        border-radius: ${size.BORDER_RADIUS}px;

        &:hover {
          @media ${device.canHover} {
            background-color: ${color.g100};
          }
        }

        padding: 0.375rem 0.5rem;
      `}
      onClick={handleUserItemClick}
    >
      <img
        src={avatar_url}
        css={css`
          width: 1rem;
          height: 1rem;
          border-radius: 9999px;
        `}
      />
      <p
        css={css`
          font-size: 0.875rem;
        `}
      >
        {login}
      </p>
    </div>
  );
}

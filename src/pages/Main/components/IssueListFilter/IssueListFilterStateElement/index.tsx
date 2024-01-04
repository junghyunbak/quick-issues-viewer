// react
import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// utils
import queryString from "query-string";

// constants
import { defaultValue } from "@/constants";

export function IssueListFilterStateElement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { state } = queryString.parse(searchParams.toString());

  const issueStates: IssueState[] = useMemo(
    () => ["open", "closed", "all"],
    []
  );

  const handleIssueStateButtonClick = useCallback(
    (issueState: string) => () => {
      setSearchParams(
        (prev) => {
          prev.delete("page");

          prev.set("state", issueState);

          return prev;
        },
        {
          replace: true,
        }
      );
    },
    [setSearchParams]
  );

  return (
    <ul
      css={css`
        display: flex;

        border-radius: ${size.BORDER_RADIUS}px;
        border: 1px solid ${color.g200};

        overflow: hidden;

        li {
          border-left: 1px solid ${color.g200};

          padding: 0.3125rem 1rem;

          font-size: 0.875rem;
          font-weight: 600;

          &:first-of-type {
            border-left: 0;
          }
        }
      `}
    >
      {issueStates.map((issueState) => {
        const isActive =
          issueState === (state || defaultValue.DEFAULT_ISSUE_STATE);

        return (
          <li
            key={issueState}
            css={css`
              background-color: ${isActive ? color.active : "transparent"};
            `}
            onClick={handleIssueStateButtonClick(issueState)}
          >
            <p
              css={css`
                color: ${isActive ? color.w : color.b};
              `}
            >
              {issueState}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

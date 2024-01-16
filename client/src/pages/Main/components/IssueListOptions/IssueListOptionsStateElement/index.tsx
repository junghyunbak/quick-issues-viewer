// react
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// utils
import queryString from "query-string";

// constants
import { defaultValue } from "@/constants";

// types
import { IssuesState, isIssuesStateEnum } from "@/types/issueSearchOptions";

export function IssueListOptionsStateElement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { state } = queryString.parse(searchParams.toString());

  const currentIssuesState = isIssuesStateEnum(state)
    ? state
    : defaultValue.ISSUES_STATE;

  const handleIssueStateButtonClick = useCallback(
    (issuesState: IssuesState) => () => {
      setSearchParams(
        (prev) => {
          prev.delete("page");

          prev.set("state", issuesState);

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

          cursor: pointer;

          &:first-of-type {
            border-left: 0;
          }
        }
      `}
    >
      {Object.keys(IssuesState).map((issuesState) => {
        if (!isIssuesStateEnum(issuesState)) {
          return null;
        }

        const isActive = currentIssuesState === issuesState;

        return (
          <li
            key={issuesState}
            css={css`
              background-color: ${isActive ? color.active : "transparent"};
            `}
            onClick={handleIssueStateButtonClick(issuesState)}
          >
            <p
              css={css`
                color: ${isActive ? color.w : color.b};
              `}
            >
              {issuesState}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

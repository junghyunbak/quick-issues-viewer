// react
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// utils
import queryString from "query-string";

// svg
import { ReactComponent as Down } from "@/assets/svgs/down.svg";

// constants
import { defaultValue } from "@/constants";

// types
import {
  IssuesSort,
  IssuesSortDirection,
  isIssuesSortDirectionEnum,
  isIssuesSortEnum,
} from "@/types/issueSearchOptions";

export function IssueListOptionsSortElement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { sort, direction } = queryString.parse(searchParams.toString());

  const currentSort = isIssuesSortEnum(sort) ? sort : defaultValue.ISSUES_SORT;

  const currentDirection = isIssuesSortDirectionEnum(direction)
    ? direction
    : defaultValue.ISSUES_SORT_DIRECTION;

  const handleIssueSortButtonClick = useCallback(
    (issuesSort: IssuesSort) => () => {
      setSearchParams(
        (prev) => {
          prev.delete("page");

          prev.set("sort", issuesSort);

          if (currentSort !== issuesSort) {
            prev.delete("direction");

            return prev;
          }

          const nextDirection =
            currentDirection === IssuesSortDirection.desc
              ? IssuesSortDirection.asc
              : IssuesSortDirection.desc;

          prev.set("direction", nextDirection);

          return prev;
        },
        {
          replace: true,
        }
      );
    },
    [currentSort, currentDirection, setSearchParams]
  );

  return (
    <ul
      css={css`
        display: flex;

        border: 1px solid ${color.g200};
        border-radius: ${size.BORDER_RADIUS}px;

        overflow: hidden;

        li {
          border-left: 1px solid ${color.g200};

          padding: 0.3125rem 0.8rem;

          font-size: 0.875rem;
          font-weight: 600;

          cursor: pointer;

          &:first-of-type {
            border-left: 0;
          }
        }
      `}
    >
      {Object.keys(IssuesSort).map((issuesSort) => {
        if (!isIssuesSortEnum(issuesSort)) {
          return null;
        }

        const isActive = issuesSort === currentSort;

        const isDesc = currentDirection === IssuesSortDirection.desc;

        return (
          <li
            key={issuesSort}
            css={css`
              display: flex;
              align-items: center;
              gap: 0.2rem;

              background-color: ${isActive ? color.active : "transparent"};
            `}
            onClick={handleIssueSortButtonClick(issuesSort)}
          >
            <p
              css={css`
                color: ${isActive ? color.w : color.b};
              `}
            >
              {issuesSort === IssuesSort["reactions-+1"] ? "👍" : issuesSort}
            </p>

            {isActive && (
              <Down
                css={css`
                  transform: rotateX(${isDesc ? "0deg" : "180deg"});

                  path {
                    fill: ${isActive ? color.w : color.b};
                  }
                `}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

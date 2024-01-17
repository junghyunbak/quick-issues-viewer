// react
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// styles
import * as S from "./index.styles";

// utils
import queryString from "query-string";

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
    <S.SortOptionList>
      {Object.keys(IssuesSort).map((issuesSort) => {
        if (!isIssuesSortEnum(issuesSort)) {
          return null;
        }

        const isActive = issuesSort === currentSort;

        return (
          <S.SortOptionListItem
            key={issuesSort}
            isActive={isActive}
            onClick={handleIssueSortButtonClick(issuesSort)}
          >
            <S.SortOptionListItemParagraph isActive={isActive}>
              {issuesSort === IssuesSort["reactions-+1"] ? "👍" : issuesSort}
            </S.SortOptionListItemParagraph>

            {isActive && (
              <S.SortOptionsDirection
                isActive={isActive}
                direction={currentDirection}
              />
            )}
          </S.SortOptionListItem>
        );
      })}
    </S.SortOptionList>
  );
}

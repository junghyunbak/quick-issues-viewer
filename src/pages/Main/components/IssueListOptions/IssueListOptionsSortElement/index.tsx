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

export function IssueListOptionsSortElement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { sort, direction } = queryString.parse(searchParams.toString());

  const issueSorts: IssuesSort[] = ["created", "comments"];

  const handleIssueSortButtonClick = useCallback(
    (issueSort: string) => () => {
      setSearchParams(
        (prev) => {
          prev.delete("page");

          prev.set("sort", issueSort);

          if ((sort || defaultValue.DEFAULT_ISSUES_SORT) !== issueSort) {
            prev.delete("direction");

            return prev;
          }

          const nextDirection: IssuesSortDirection =
            ((direction as IssuesSortDirection) ||
              defaultValue.DEFAULT_ISSUES_SORT_DIRECTION) === "desc"
              ? "asc"
              : "desc";

          prev.set("direction", nextDirection);

          return prev;
        },
        {
          replace: true,
        }
      );
    },
    [sort, direction, setSearchParams]
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
      {issueSorts.map((issueSort) => {
        const isActive =
          issueSort === (sort || defaultValue.DEFAULT_ISSUES_SORT);

        const isDesc =
          (direction || defaultValue.DEFAULT_ISSUES_SORT_DIRECTION) === "desc";

        return (
          <li
            key={issueSort}
            css={css`
              display: flex;
              align-items: center;
              gap: 0.2rem;

              background-color: ${isActive ? color.active : "transparent"};
            `}
            onClick={handleIssueSortButtonClick(issueSort)}
          >
            <p
              css={css`
                color: ${isActive ? color.w : color.b};
              `}
            >
              {issueSort}
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

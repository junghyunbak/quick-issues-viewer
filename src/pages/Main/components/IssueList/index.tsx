// react
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { useParams, useSearchParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color, device, size } from "@/assets/styles";

// constants
import { defaultValue } from "@/constants";

// components
import { IssueListItem } from "./IssueListItem";
import { IssueListPaginate } from "./IssueListPaginate";
import { IssueListOptions } from "./IssueListOptions";

// utils
import queryString from "query-string";

import { useOctokit } from "@/hooks";

export function IssueList() {
  const { owner, repo } = useParams();

  const [searchParams] = useSearchParams();

  const { apiService } = useOctokit();

  const { label, per_page, page, state, sort, direction } = queryString.parse(
    searchParams.toString()
  );

  const issues = useQuery(
    [
      "issue",
      "list",
      owner,
      repo,
      label,
      per_page || defaultValue.DEFAULT_ISSUE_PER_PAGE,
      page || defaultValue.DEFAULT_ISSUE_PAGE,
      state || defaultValue.DEFAULT_ISSUE_STATE,
      sort || defaultValue.DEFAULT_ISSUES_SORT,
      direction || defaultValue.DEFAULT_ISSUES_SORT_DIRECTION,
    ],
    async () => {
      if (label instanceof Array) {
        return;
      }

      return await apiService.getRepoIssueList(
        owner || "",
        repo || "",
        (label || "").split(","),
        Number(per_page) || defaultValue.DEFAULT_ISSUE_PER_PAGE,
        Number(page) || defaultValue.DEFAULT_ISSUE_PAGE,
        (state as IssuesState) || defaultValue.DEFAULT_ISSUE_STATE,
        (sort as IssuesSort) || defaultValue.DEFAULT_ISSUES_SORT_DIRECTION,
        (direction as IssuesSortDirection) ||
          defaultValue.DEFAULT_ISSUES_SORT_DIRECTION
      );
    }
  );

  const [selectedIssueId, setSelectedIssueId] = useState<number | null>(null);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;

        height: 100%;
      `}
    >
      <div
        css={css`
          padding: 1.25rem;
        `}
      >
        <IssueListOptions />
      </div>

      <div
        css={css`
          width: 100%;
          height: 100%;

          padding: 0 1.25rem;

          @media ${device.mobile} {
            padding-left: 0;
            padding-right: 0;
          }
        `}
      >
        {issues.isLoading ? (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;

              width: 100%;
              height: 100%;
            `}
          >
            <RotatingLines width="2rem" strokeColor="gray" />
          </div>
        ) : (
          issues.data &&
          issues.data.items.length > 0 && (
            <Fragment>
              <ul
                css={css`
                  width: 100%;

                  border-radius: ${size.BORDER_RADIUS}px;
                  border: 1px solid ${color.g200};

                  @media ${device.mobile} {
                    border-radius: 0;
                    border-left: 0;
                    border-right: 0;
                  }
                `}
              >
                {issues.data.items.map((issue) => {
                  return (
                    <IssueListItem
                      key={issue.id}
                      issue={issue}
                      selectedIssueId={selectedIssueId}
                      setSelectedIssueId={setSelectedIssueId}
                    />
                  );
                })}
              </ul>

              <div
                css={css`
                  padding: 1.25rem 0;
                `}
              >
                <IssueListPaginate pageCount={issues.data.pageCount} />
              </div>
            </Fragment>
          )
        )}
      </div>
    </div>
  );
}

// react
import { Fragment } from "react";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { useParams, useSearchParams } from "react-router-dom";
import { IssueSelectionStateProvider } from "./index.context";

// styles
import * as S from "./index.styles";

// constants
import { defaultValue } from "@/constants";

// components
import { IssueListItem } from "./IssueListItem";
import { IssueListPaginate } from "./IssueListPaginate";

// utils
import queryString from "query-string";

// hooks
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

  if (issues.isLoading) {
    return (
      <S.IssueListLoadingBox>
        <RotatingLines width="2rem" strokeColor="gray" />
      </S.IssueListLoadingBox>
    );
  }

  return (
    <S.IssueListLayout>
      {issues.data && issues.data.items.length > 0 && (
        <Fragment>
          <IssueSelectionStateProvider>
            <S.IssueList>
              {issues.data.items.map((issue) => {
                return (
                  <S.IssueItem key={issue.id}>
                    <IssueListItem issue={issue} />
                  </S.IssueItem>
                );
              })}
            </S.IssueList>
          </IssueSelectionStateProvider>

          <S.IssueListPaginateLayout>
            <IssueListPaginate pageCount={issues.data.pageCount} />
          </S.IssueListPaginateLayout>
        </Fragment>
      )}
    </S.IssueListLayout>
  );
}

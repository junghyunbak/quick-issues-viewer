// react
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

// types
import {
  isIssuesStateEnum,
  isIssuesSortEnum,
  isIssuesSortDirectionEnum,
  isNumberString,
  isLabelsString,
} from "@/types/issueSearchOptions";

export function IssueList() {
  const { owner, repo } = useParams();

  const [searchParams] = useSearchParams();

  const { apiService } = useOctokit();

  const { label, per_page, page, state, sort, direction } = queryString.parse(
    searchParams.toString()
  );

  const searchOwner = owner || "";
  const searchRepo = repo || "";
  const searchLabels = isLabelsString(label) ? label.split(",") : [];
  const searchPerPage = isNumberString(per_page)
    ? parseInt(per_page, 10)
    : defaultValue.ISSUES_PER_PAGE;
  const searchPage = isNumberString(page)
    ? parseInt(page, 10)
    : defaultValue.ISSUES_PAGE;
  const searchState = isIssuesStateEnum(state)
    ? state
    : defaultValue.ISSUES_STATE;
  const searchSort = isIssuesSortEnum(sort) ? sort : defaultValue.ISSUES_SORT;
  const searchDirection = isIssuesSortDirectionEnum(direction)
    ? direction
    : defaultValue.ISSUES_SORT_DIRECTION;

  const issues = useQuery(
    [
      "issue",
      "list",
      searchOwner,
      searchRepo,
      searchLabels,
      searchPerPage,
      searchPage,
      searchState,
      searchSort,
      searchDirection,
    ],
    async () => {
      return await apiService.getRepoIssueList(
        searchOwner,
        searchRepo,
        searchLabels,
        searchPerPage,
        searchPage,
        searchState,
        searchSort,
        searchDirection
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

  if (!issues.data || issues.data.items.length === 0) {
    return null;
  }

  return (
    <IssueSelectionStateProvider>
      <S.IssueListLayout>
        <S.IssueList>
          {issues.data.items.map((issue) => {
            return <IssueListItem key={issue.id} issue={issue} />;
          })}
        </S.IssueList>

        <S.IssueListPaginateLayout>
          <IssueListPaginate pageCount={issues.data.pageCount} />
        </S.IssueListPaginateLayout>
      </S.IssueListLayout>
    </IssueSelectionStateProvider>
  );
}

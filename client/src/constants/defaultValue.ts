import {
  IssuesState,
  IssuesSort,
  IssuesSortDirection,
} from "@/types/issueSearchOptions";

export const REPO_OWNER = "junghyunbak";
export const REPO_NAME = "quick-issues-viewer";

export const ISSUES_PER_PAGE = 25;
export const ISSUES_PAGE = 1;
export const ISSUES_STATE: IssuesState = IssuesState.open;
export const ISSUES_SORT: IssuesSort = IssuesSort.created;
export const ISSUES_SORT_DIRECTION: IssuesSortDirection =
  IssuesSortDirection.desc;

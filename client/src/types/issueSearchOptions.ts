export enum IssuesState {
  "all" = "all",
  "closed" = "closed",
  "open" = "open",
}

export enum IssuesSort {
  "created" = "created",
  "comments" = "comments",
  "reactions-+1" = "reactions-+1",
}

export enum IssuesSortDirection {
  "desc" = "desc",
  "asc" = "asc",
}

export function isIssuesStateUnion(value: any): value is IssuesState {
  return Object.keys(IssuesState).includes(value);
}

export function isIssuesSortUnion(value: any): value is IssuesSort {
  return Object.keys(IssuesSort).includes(value);
}

export function isIssuesSortDirectionUnion(
  value: any
): value is IssuesSortDirection {
  return Object.keys(IssuesSortDirection).includes(value);
}

export function isNumberString(value: any): value is string {
  return !isNaN(Number(value));
}

export function isLabelsString(value: any): value is string {
  return typeof value === "string" && value !== "";
}

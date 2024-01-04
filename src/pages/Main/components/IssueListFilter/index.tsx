// styles
import { css } from "@emotion/react";

// components
import { IssueListFilterStateElement } from "./IssueListFilterStateElement";
import { IssueListFilterSortElement } from "./IssueListFilterSortElement";

export function IssueListFilter() {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;

        padding: 1.25rem;
        padding-bottom: 0;

        gap: 0.5rem;
      `}
    >
      <IssueListFilterStateElement />
      <IssueListFilterSortElement />
    </div>
  );
}

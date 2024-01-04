// styles
import { css } from "@emotion/react";

// components
import { IssueListOptionsStateElement } from "./IssueListOptionsStateElement";
import { IssueListOptionsSortElement } from "./IssueListOptionsSortElement";

export function IssueListOptions() {
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
      <IssueListOptionsStateElement />
      <IssueListOptionsSortElement />
    </div>
  );
}

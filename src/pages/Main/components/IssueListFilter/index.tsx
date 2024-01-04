// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// components
import { IssueListFilterStateElement } from "./IssueListFilterStateElement";

export function IssueListFilter() {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;

        padding: 1.25rem;
        padding-bottom: 0;
      `}
    >
      <IssueListFilterStateElement />
    </div>
  );
}

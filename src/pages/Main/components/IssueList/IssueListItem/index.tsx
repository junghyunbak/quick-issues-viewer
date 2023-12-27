// styles
import { css } from "@emotion/react";

// components
import { IssueListItemLabelList } from "@/pages/Main/components/IssueList/IssueListItem/IssueListItemLabelList";

import { type components } from "@octokit/openapi-types";

interface IssueListItemProps {
  issue: components["schemas"]["issue"];
}

export function IssueListItem({ issue }: IssueListItemProps) {
  const { id, title, user, labels } = issue;

  return (
    <li
      key={id}
      css={css`
        display: flex;

        list-style: none;
      `}
    >
      <p>{title}</p>

      <IssueListItemLabelList labels={labels} />
    </li>
  );
}

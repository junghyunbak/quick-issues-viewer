// styles
import { css } from "@emotion/react";

// components
import { IssueListItemLabelList } from "@/pages/Main/components/IssueList/IssueListItemLabelList";

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
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <img
          src={user?.avatar_url}
          css={css`
            width: 40px;
            height: 40px;
            border-radius: 9999px;
          `}
          alt="avatar_image"
        />

        <p
          css={css`
            margin: 0;
            font-size: 12px;
          `}
        >
          {user?.login}
        </p>
      </div>

      <p>{title}</p>

      <IssueListItemLabelList labels={labels} />
    </li>
  );
}

// styles
import { css } from "@emotion/react";

// components
import { IssueListItemLabelListItem } from "./IssueListItemLabelListItem";

import { type components } from "@octokit/openapi-types";

interface IssueLabelListProps {
  labels: components["schemas"]["issue"]["labels"];
}

export function IssueListItemLabelList({ labels }: IssueLabelListProps) {
  return (
    <div>
      <ul
        css={css`
          display: flex;
          flex-wrap: wrap;

          padding: 0;

          gap: 4px;

          li {
            list-style: none;
          }
        `}
      >
        {labels.map((label, i) => {
          if (typeof label === "string") {
            return null;
          }

          const { id, name, color } = label;

          if (!id || !name || !color) {
            return null;
          }

          return (
            <IssueListItemLabelListItem
              key={id}
              labelName={name}
              labelBgColor={color}
            />
          );
        })}
      </ul>
    </div>
  );
}

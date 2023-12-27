// styles
import { css } from "@emotion/react";

// components
import { IssueLabelListItem } from "./IssueLabelListItem";

import { type components } from "@octokit/openapi-types";

interface IssueLabelListProps {
  labels: components["schemas"]["issue"]["labels"];
}

export function IssueLabelList({ labels }: IssueLabelListProps) {
  return (
    <div>
      <ul
        css={css`
          display: flex;

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
            <IssueLabelListItem
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

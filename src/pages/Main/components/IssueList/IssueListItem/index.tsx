// react
import { IssueProvider } from "./index.context";
import { IssueListItemHeader } from "./IssueListItemHeader";

// components
import { IssueListItemBody } from "./IssueListItemBody";

// styles
import { css } from "@emotion/react";
import { size } from "@/assets/styles";

// apis
import { type components } from "@octokit/openapi-types";

interface IssueListItemProps {
  issue: components["schemas"]["issue"];
}

export function IssueListItem({ issue }: IssueListItemProps) {
  return (
    <li
      css={css`
        display: flex;
        flex-direction: column;

        list-style: none;

        &:first-of-type {
          > div:first-child {
            border-top-right-radius: ${size.BORDER_RADIUS}px;
            border-top-left-radius: ${size.BORDER_RADIUS}px;
          }
        }

        &:last-child {
          border-bottom: 0;

          > div:last-child {
            border-bottom-right-radius: ${size.BORDER_RADIUS}px;
            border-bottom-left-radius: ${size.BORDER_RADIUS}px;

            border-bottom: 0;
          }
        }
      `}
    >
      <IssueProvider value={issue}>
        <IssueListItemHeader />
        <IssueListItemBody />
      </IssueProvider>
    </li>
  );
}

// react
import { IssueProvider } from "./index.context";
import { IssueListItemHeader } from "./IssueListItemHeader";

// components
import { IssueListItemBody } from "./IssueListItemBody";

// styles
import * as S from "./index.styles";
import { css } from "@emotion/react";

// apis
import { type components } from "@octokit/openapi-types";

interface IssueListItemProps {
  issue: components["schemas"]["issue"];
}

export function IssueListItem({ issue }: IssueListItemProps) {
  return (
    <IssueProvider value={issue}>
      <S.IssueItemLayout>
        <IssueListItemHeader />
        <IssueListItemBody />
      </S.IssueItemLayout>
    </IssueProvider>
  );
}

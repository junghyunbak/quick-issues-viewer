// react
import { IssueProvider } from "./index.context";

// components
import { IssueListItemHeader } from "./IssueListItemHeader";
import { IssueListItemBody } from "./IssueListItemBody";

// styles
import * as S from "./index.styles";

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

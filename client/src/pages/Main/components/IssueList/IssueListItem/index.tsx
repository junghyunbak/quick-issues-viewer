// react
import { useContext, useRef } from "react";
import { IssueProvider } from "./index.context";
import { IssueSelectionStateContext } from "@/pages/Main/components/IssueList/index.context";

// components
import { IssueListItemHeader } from "./IssueListItemHeader";
import { IssueListItemBody } from "./IssueListItemBody";

// styles
import * as S from "./index.styles";

// apis
import { type components } from "@octokit/openapi-types";

interface IssueListItemProps {
  issue: components["schemas"]["issue-search-result-item"];
}

export function IssueListItem({ issue }: IssueListItemProps) {
  const { selectedIssueId } = useContext(IssueSelectionStateContext);

  const issueItemHeaderRef = useRef<HTMLDivElement | null>(null);

  return (
    <IssueProvider value={issue}>
      <S.IssueItemLayout>
        <IssueListItemHeader issueItemHeaderRef={issueItemHeaderRef} />
        {selectedIssueId === issue.id && (
          <IssueListItemBody issueItemHeaderRef={issueItemHeaderRef} />
        )}
      </S.IssueItemLayout>
    </IssueProvider>
  );
}

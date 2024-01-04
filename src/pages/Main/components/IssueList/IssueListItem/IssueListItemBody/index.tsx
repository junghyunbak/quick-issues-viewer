// components
import { IssueComment } from "@/pages/Main/components/IssueList/IssueListItem/IssueListItemBody/IssueComment";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

// apis
import { type components } from "@octokit/openapi-types";

// hooks
import { useOctokit } from "@/hooks";

interface IssueListItemBodyProps {
  markdownText: string;

  issueUrl: string;

  user: components["schemas"]["nullable-simple-user"];
}

export function IssueListItemBody(props: IssueListItemBodyProps) {
  const { apiService } = useOctokit();

  return (
    <div
      css={css`
        border-top: 1px solid ${color.g200};

        padding: 0.75rem;
      `}
    >
      <IssueComment {...props} />
    </div>
  );
}

// react
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

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
  issueNumber: number;

  markdownText: string;

  issueUrl: string;

  user: components["schemas"]["nullable-simple-user"];
}

export function IssueListItemBody({
  issueNumber,
  ...props
}: IssueListItemBodyProps) {
  const { owner, repo } = useParams();

  const { apiService } = useOctokit();

  const comments = useQuery(
    ["issue", "comment", owner, repo, issueNumber],
    async () => {
      const comments = apiService.getIssueComments(
        owner || "",
        repo || "",
        issueNumber
      );

      return comments;
    }
  );

  return (
    <div
      css={css`
        border-top: 1px solid ${color.g200};

        padding: 0.75rem;
      `}
    >
      <IssueComment {...props} isComment={false} />

      {comments.data && (
        <ul>
          {comments.data.map((comment) => {
            const { id, body, html_url, user } = comment;

            return (
              <li key={id}>
                <IssueComment
                  markdownText={body || ""}
                  issueUrl={html_url}
                  user={user}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

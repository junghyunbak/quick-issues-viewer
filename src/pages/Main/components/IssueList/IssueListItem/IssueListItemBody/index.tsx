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
  issue: components["schemas"]["issue"];
}

export function IssueListItemBody({ issue }: IssueListItemBodyProps) {
  const { owner, repo } = useParams();

  const { apiService } = useOctokit();

  const { number, body, user, html_url, reactions } = issue;

  const comments = useQuery(
    ["issue", "comment", owner, repo, number],
    async () => {
      const comments = apiService.getIssueComments(
        owner || "",
        repo || "",
        number
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
      <IssueComment
        markdownText={body || ""}
        user={user}
        issueUrl={html_url}
        isComment={false}
        reactions={reactions}
      />

      {comments.data && (
        <ul>
          {comments.data.map((comment) => {
            const { id, body, html_url, user, reactions } = comment;

            return (
              <li key={id}>
                <IssueComment
                  markdownText={body || ""}
                  issueUrl={html_url}
                  user={user}
                  reactions={reactions}
                />
              </li>
            );
          })}
        </ul>
      )}

      <div
        css={css`
          border-top: 2px solid #d0d7de;
        `}
      />
    </div>
  );
}
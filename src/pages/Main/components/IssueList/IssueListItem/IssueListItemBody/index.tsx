// react
import { Fragment, useCallback } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

// components
import { IssueComment } from "@/pages/Main/components/IssueList/IssueListItem/IssueListItemBody/IssueComment";
import { CloseBodyButton } from "./CloseBodyButton";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

// apis
import { type components } from "@octokit/openapi-types";

// hooks
import { useOctokit } from "@/hooks";

interface IssueListItemBodyProps {
  issue: components["schemas"]["issue"];

  setSelectedIssueId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function IssueListItemBody({
  issue,
  setSelectedIssueId,
}: IssueListItemBodyProps) {
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

  const handleIssueBodyCloseButtonClick = useCallback(() => {
    setSelectedIssueId(null);
  }, [setSelectedIssueId]);

  return (
    <div
      css={css`
        border-top: 1px solid ${color.g200};

        display: flex;
        flex-direction: column;
        align-items: center;

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

      {comments.data && comments.data.length > 0 ? (
        <Fragment>
          <ul
            css={css`
              width: 100%;
            `}
          >
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

          <div
            css={css`
              width: 100%;

              border-top: 2px solid #d0d7de;
            `}
          />

          <CloseBodyButton onClick={handleIssueBodyCloseButtonClick} />
        </Fragment>
      ) : (
        <div
          css={css`
            width: 100%;

            border-top: 2px solid #d0d7de;
          `}
        />
      )}
    </div>
  );
}

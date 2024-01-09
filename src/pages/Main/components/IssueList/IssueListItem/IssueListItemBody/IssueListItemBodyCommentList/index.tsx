// react
import { Fragment, useContext, useCallback } from "react";
import { IssueContext } from "../../index.context";
import { IssueSelectionStateContext } from "../../../index.context";

// react
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

// hooks
import { useOctokit } from "@/hooks";

// components
import { CircleCloseButton } from "@/components/core/Button/CircleCloseButton";
import { IssueComment } from "@/components/widgets/IssueComment";

// styles
import { css } from "@emotion/react";

export function IssueListItemBodyCommentList() {
  const { owner, repo } = useParams();

  const { apiService } = useOctokit();

  const { number } = useContext(IssueContext);
  const { setSelectedIssueId } = useContext(IssueSelectionStateContext);

  const handleIssueBodyCloseButtonClick = useCallback(() => {
    setSelectedIssueId(null);
  }, [setSelectedIssueId]);

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

  if (!comments.data || comments.data.length === 0) {
    return null;
  }

  return (
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

      <CircleCloseButton onClick={handleIssueBodyCloseButtonClick} />
    </Fragment>
  );
}

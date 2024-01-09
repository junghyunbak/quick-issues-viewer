// react
import { Fragment, useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IssueSelectionStateContext } from "../../index.context";
import { IssueContext } from "../index.context";

// components
import { IssueComment } from "@/pages/Main/components/IssueList/IssueListItem/IssueListItemBody/IssueComment";
import { CloseBodyButton } from "./CloseBodyButton";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// hooks
import { useOctokit } from "@/hooks";

function CommentList() {
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
      <CloseBodyButton onClick={handleIssueBodyCloseButtonClick} />
    </Fragment>
  );
}

export function IssueListItemBody() {
  const { id, body, user, html_url, reactions, comments } =
    useContext(IssueContext);

  const { selectedIssueId } = useContext(IssueSelectionStateContext);

  const [commentsIsOpen, setCommentsIsOpen] = useState(false);

  const handleCommentsOpenButtonClick = useCallback(() => {
    setCommentsIsOpen(true);
  }, [setCommentsIsOpen]);

  if (id !== selectedIssueId) {
    return null;
  }

  return (
    <div
      css={css`
        border-bottom: 1px solid ${color.g200};

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

      {!commentsIsOpen && (
        <div
          css={css`
            width: 100%;

            border-top: 2px solid #d0d7de;
          `}
        >
          {comments > 0 && (
            <div
              css={css`
                background-color: ${color.g100};

                border: 1px solid ${color.g200};
                border-radius: ${size.BORDER_RADIUS}px;

                margin-top: 0.75rem;

                cursor: pointer;

                padding: 0.3125rem 1rem;
              `}
              onClick={handleCommentsOpenButtonClick}
            >
              <p
                css={css`
                  text-align: center;
                  font-weight: 600;
                  font-size: 0.875rem;
                `}
              >
                Show comments
              </p>
            </div>
          )}
        </div>
      )}

      {commentsIsOpen && <CommentList />}
    </div>
  );
}

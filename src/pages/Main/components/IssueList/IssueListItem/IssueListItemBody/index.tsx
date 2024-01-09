// react
import { useCallback, useContext, useState } from "react";

import { IssueSelectionStateContext } from "../../index.context";
import { IssueContext } from "../index.context";

// components
import { IssueComment } from "@/components/widgets/IssueComment";
import { IssueListItemBodyCommentList } from "./IssueListItemBodyCommentList";
import { IssueListItemBodyShowCommentsButton } from "./IssueListItemBodyShowCommentsButton";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

export function IssueListItemBody() {
  const { id, body, user, html_url, reactions, comments } =
    useContext(IssueContext);

  const { selectedIssueId } = useContext(IssueSelectionStateContext);

  const [commentsIsOpen, setCommentsIsOpen] = useState(false);

  const handleCommentsOpenButtonClick = useCallback(() => {
    setCommentsIsOpen(true);
  }, [setCommentsIsOpen]);

  const isCommentsExist = comments > 0;

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

      {commentsIsOpen && <IssueListItemBodyCommentList />}

      <div
        css={css`
          width: 100%;

          border-top: 2px solid #d0d7de;
        `}
      />

      {!commentsIsOpen && isCommentsExist && (
        <IssueListItemBodyShowCommentsButton
          onClick={handleCommentsOpenButtonClick}
        />
      )}
    </div>
  );
}

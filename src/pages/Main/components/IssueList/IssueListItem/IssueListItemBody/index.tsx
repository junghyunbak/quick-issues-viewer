// react
import { useCallback, useContext, useState } from "react";
import { IssueContext } from "@/pages/Main/components/IssueList/IssueListItem/index.context";
import { IssueSelectionStateContext } from "@/pages/Main/components/IssueList/index.context";

// components
import { IssueComment } from "@/components/widgets/IssueComment";
import { IssueListItemBodyCommentList } from "./IssueListItemBodyCommentList";
import { IssueListItemBodyShowCommentsButton } from "./IssueListItemBodyShowCommentsButton";

// styles
import * as S from "./index.styles";

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
    <S.IssueBodyLayout>
      <IssueComment
        markdownText={body || ""}
        user={user}
        issueUrl={html_url}
        isComment={false}
        reactions={reactions}
      />

      {commentsIsOpen && <IssueListItemBodyCommentList />}

      <S.IssueBodySplitLineBox />

      {!commentsIsOpen && isCommentsExist && (
        <IssueListItemBodyShowCommentsButton
          onClick={handleCommentsOpenButtonClick}
        />
      )}
    </S.IssueBodyLayout>
  );
}

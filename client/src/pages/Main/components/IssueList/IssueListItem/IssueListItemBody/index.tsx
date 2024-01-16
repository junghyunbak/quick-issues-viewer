// react
import { useCallback, useContext, useState, forwardRef } from "react";
import { IssueContext } from "@/pages/Main/components/IssueList/IssueListItem/index.context";

// components
import { IssueComment } from "@/components/widgets/IssueComment";
import { IssueListItemBodyCommentList } from "./IssueListItemBodyCommentList";
import { IssueListItemBodyShowCommentsButton } from "./IssueListItemBodyShowCommentsButton";

// styles
import * as S from "./index.styles";

interface IssueListItemBodyProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const IssueListItemBody = forwardRef<
  HTMLDivElement | null,
  IssueListItemBodyProps
>((props, ref) => {
  const { body, user, html_url, reactions, comments } =
    useContext(IssueContext);

  const [commentsIsOpen, setCommentsIsOpen] = useState(false);

  const handleCommentsOpenButtonClick = useCallback(() => {
    setCommentsIsOpen(true);
  }, [setCommentsIsOpen]);

  const isCommentsExist = comments > 0;

  return (
    <S.IssueBodyLayout ref={ref} {...props}>
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
});

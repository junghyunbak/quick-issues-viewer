// react
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  MutableRefObject,
} from "react";
import { IssueContext } from "@/pages/Main/components/IssueList/IssueListItem/index.context";
import { IssueListRefsContext } from "@/pages/Main/index.context";

// components
import { IssueComment } from "@/components/widgets/IssueComment";
import { IssueListItemBodyCommentList } from "./IssueListItemBodyCommentList";
import { IssueListItemBodyShowCommentsButton } from "./IssueListItemBodyShowCommentsButton";

// styles
import * as S from "./index.styles";

interface IssueListItemBodyProps {
  issueItemHeaderRef: MutableRefObject<HTMLDivElement | null>;
  issueBodyRef: MutableRefObject<HTMLDivElement | null>;
}

export function IssueListItemBody({
  issueItemHeaderRef,
  issueBodyRef,
}: IssueListItemBodyProps) {
  const { body, user, html_url, reactions, comments } =
    useContext(IssueContext);

  const { scrollRef, contentRef } = useContext(IssueListRefsContext);

  useEffect(() => {
    /**
     * 이슈의 body가 열렸을 때 scroll 영역과 body의 올바른 offset값을 구하여 스크롤 위치를 변경
     */
    if (
      !scrollRef.current ||
      !contentRef.current ||
      !issueBodyRef.current ||
      !issueItemHeaderRef.current
    ) {
      return;
    }

    const { y: scrollY, height: scorllHeight } =
      scrollRef.current.getClientRects()[0];
    const { y: contentY } = contentRef.current.getClientRects()[0];
    const { y: bodyY } = issueBodyRef.current.getClientRects()[0];

    const { height: headerHeight } =
      issueItemHeaderRef.current.getClientRects()[0];

    const bodyOffset = bodyY - contentY;

    if (bodyY < scrollY || bodyY > scrollY + scorllHeight) {
      scrollRef.current?.scrollTo(0, bodyOffset - headerHeight);
    }
  }, [scrollRef, contentRef, issueBodyRef, issueItemHeaderRef]);

  const [commentsIsOpen, setCommentsIsOpen] = useState(false);

  const handleCommentsOpenButtonClick = useCallback(() => {
    setCommentsIsOpen(true);
  }, [setCommentsIsOpen]);

  const isCommentsExist = comments > 0;

  return (
    <S.IssueBodyLayout ref={issueBodyRef}>
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

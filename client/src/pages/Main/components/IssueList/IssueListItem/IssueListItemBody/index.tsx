// react
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
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
}

export function IssueListItemBody({
  issueItemHeaderRef,
}: IssueListItemBodyProps) {
  const { body, user, html_url, reactions, comments } =
    useContext(IssueContext);

  const { scrollRef, contentRef } = useContext(IssueListRefsContext);

  const issueBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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

    return () => {
      if (
        !scrollRef.current ||
        !issueItemHeaderRef.current ||
        !contentRef.current
      ) {
        return;
      }

      const { y: scrollY, height: scorllHeight } =
        scrollRef.current.getClientRects()[0];
      const { y: contentY } = contentRef.current.getClientRects()[0];
      const { y: headerY } = issueItemHeaderRef.current.getClientRects()[0];

      const headerOffset = headerY - contentY;

      if (headerY < scrollY || headerY > scrollY + scorllHeight) {
        scrollRef.current?.scrollTo(0, headerOffset);
      }
    };
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

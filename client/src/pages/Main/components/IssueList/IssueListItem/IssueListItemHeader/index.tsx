// react
import { useCallback, useMemo, useContext, MutableRefObject } from "react";
import { IssueContext } from "@/pages/Main/components/IssueList/IssueListItem/index.context";
import { IssueListRefsContext } from "@/pages/Main/index.context";
import { IssueSelectionStateContext } from "@/pages/Main/components/IssueList/index.context";

// components
import { IssueListItemHeaderLabelList } from "./IssueListItemHeaderLabelList";

// styles
import * as S from "./index.styles";

interface IssueListItemHeaderProps {
  issueItemHeaderRef: MutableRefObject<HTMLDivElement | null>;
  issueBodyRef: MutableRefObject<HTMLDivElement | null>;
}

export function IssueListItemHeader({
  issueItemHeaderRef,
  issueBodyRef,
}: IssueListItemHeaderProps) {
  const { id, state, title, comments, created_at, pull_request, reactions } =
    useContext(IssueContext);

  const { scrollRef, contentRef } = useContext(IssueListRefsContext);

  const { setSelectedIssueId } = useContext(IssueSelectionStateContext);

  const handleIssueItemClick = useCallback(() => {
    setSelectedIssueId((prev) => {
      if (prev === id) {
        if (
          scrollRef.current &&
          issueBodyRef.current &&
          contentRef.current &&
          issueItemHeaderRef.current
        ) {
          const { y: scrollY, height: scorllHeight } =
            scrollRef.current.getClientRects()[0];
          const { y: contentY } = contentRef.current.getClientRects()[0];
          const { y: bodyY } = issueBodyRef.current.getClientRects()[0];

          const bodyOffset = bodyY - contentY;

          const { height: headerHeight } =
            issueItemHeaderRef.current.getClientRects()[0];

          if (bodyY < scrollY || bodyY > scrollY + scorllHeight) {
            scrollRef.current?.scrollTo(0, bodyOffset - headerHeight);
          }
        }

        return null;
      }

      return id;
    });
  }, [
    id,
    setSelectedIssueId,
    scrollRef,
    issueBodyRef,
    contentRef,
    issueItemHeaderRef,
  ]);

  const StatusIcon = useMemo<React.ReactNode>(() => {
    if (pull_request) {
      if (state === "open") {
        return <S.PrOpen />;
      } else {
        if (!pull_request.merged_at) {
          return <S.PrClosed />;
        } else {
          return <S.PrMerged />;
        }
      }
    }

    return state === "open" ? <S.IssueOpened /> : <S.IssueClosed />;
  }, [state, pull_request]);

  const isCommentExist = comments > 0;

  return (
    <S.IssueListItemHeaderLayout
      onClick={handleIssueItemClick}
      ref={issueItemHeaderRef}
    >
      <S.IssueInfoLayout>
        <S.IssueInfoStatusBox>{StatusIcon}</S.IssueInfoStatusBox>

        <S.IssueInfoTextBoxLayout>
          <S.IssueInfoTitleLayout>
            <S.IssueInfoTitleParagraph>{title}</S.IssueInfoTitleParagraph>

            <IssueListItemHeaderLabelList />
          </S.IssueInfoTitleLayout>

          <S.IssueInfoSubTitleParagraph>
            {new Date(created_at).toLocaleString()}
          </S.IssueInfoSubTitleParagraph>
        </S.IssueInfoTextBoxLayout>
      </S.IssueInfoLayout>

      <S.CountingBox>
        {isCommentExist && (
          <S.CountingBoxItem>
            <S.Comment />
            <S.CountingBoxItemParagraph>{comments}</S.CountingBoxItemParagraph>
          </S.CountingBoxItem>
        )}

        {reactions && reactions["+1"] > 0 && (
          <S.CountingBoxItem>
            <S.CountingBoxItemParagraph>{"👍"}</S.CountingBoxItemParagraph>
            <S.CountingBoxItemParagraph>
              {reactions["+1"]}
            </S.CountingBoxItemParagraph>
          </S.CountingBoxItem>
        )}
      </S.CountingBox>
    </S.IssueListItemHeaderLayout>
  );
}

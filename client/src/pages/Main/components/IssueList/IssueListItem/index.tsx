// react
import { useContext, useRef, useCallback, useState, useEffect } from "react";
import { IssueProvider } from "./index.context";
import { IssueSelectionStateContext } from "@/pages/Main/components/IssueList/index.context";
import { IssueListRefsContext } from "@/pages/Main/index.context";

// components
import { IssueListItemHeader } from "./IssueListItemHeader";
import { IssueListItemBody } from "./IssueListItemBody";

// styles
import * as S from "./index.styles";

// apis
import { type components } from "@octokit/openapi-types";

interface IssueListItemProps {
  issue: components["schemas"]["issue-search-result-item"];
}

export function IssueListItem({ issue }: IssueListItemProps) {
  const { selectedIssueId, setSelectedIssueId } = useContext(
    IssueSelectionStateContext
  );
  const { scrollRef, contentRef } = useContext(IssueListRefsContext);

  const issueHeaderRef = useRef<HTMLDivElement | null>(null);
  const issueBodyRef = useRef<HTMLDivElement | null>(null);

  const [isBodyOpen, setIsBodyOpen] = useState(selectedIssueId === issue.id);

  const moveScrollToIssueHeader = useCallback(() => {
    if (
      !scrollRef.current ||
      !contentRef.current ||
      !issueBodyRef.current ||
      !issueHeaderRef.current
    ) {
      return;
    }

    const { y: scrollY, height: scorllHeight } =
      scrollRef.current.getClientRects()[0];
    const { y: contentY } = contentRef.current.getClientRects()[0];
    const { y: bodyY } = issueBodyRef.current.getClientRects()[0];
    const { height: headerHeight } = issueHeaderRef.current.getClientRects()[0];

    const bodyOffset = bodyY - contentY;

    if (scrollY <= bodyY && bodyY <= scrollY + scorllHeight) {
      return;
    }

    scrollRef.current.scrollTo(0, bodyOffset - headerHeight);
  }, [scrollRef, contentRef, issueBodyRef, issueHeaderRef]);

  const handleIssueHeaderClick = useCallback(() => {
    setSelectedIssueId((prev) => {
      if (prev === issue.id) {
        moveScrollToIssueHeader();

        return null;
      }

      return issue.id;
    });
  }, [issue.id, setSelectedIssueId, moveScrollToIssueHeader]);

  /**
   * 선택된 이슈의 id가 달라질 때 마다 body의 열림여부 갱신
   */
  useEffect(() => {
    setIsBodyOpen(selectedIssueId === issue.id);
  }, [issue.id, selectedIssueId, setIsBodyOpen]);

  /**
   * body가 열렸을 경우 해당 이슈의 위치로 스크롤 이동
   */
  useEffect(() => {
    if (!isBodyOpen) {
      return;
    }

    moveScrollToIssueHeader();
  }, [isBodyOpen, moveScrollToIssueHeader]);

  return (
    <IssueProvider value={issue}>
      <S.IssueItemLayout>
        <IssueListItemHeader
          ref={issueHeaderRef}
          onClick={handleIssueHeaderClick}
        />
        {isBodyOpen && <IssueListItemBody ref={issueBodyRef} />}
      </S.IssueItemLayout>
    </IssueProvider>
  );
}

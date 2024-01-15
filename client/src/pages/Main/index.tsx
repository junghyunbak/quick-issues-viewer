// react
import { useRef } from "react";
import { IssueListRefsProvider } from "./index.context";

// components
import { IssueList } from "@/pages/Main/components/IssueList";
import { LabelList } from "@/pages/Main/components/LabelList";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";
import { Header } from "./components/Header";
import { IssueListOptions } from "@/pages/Main/components/IssueListOptions";

// styles
import * as S from "./index.styles";

export function Main() {
  const issueListScrollRef = useRef<HTMLDivElement | null>(null);
  const issueListContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <IssueListRefsProvider
      value={{ scrollRef: issueListScrollRef, contentRef: issueListContentRef }}
    >
      <S.MainLayout>
        <FixedAndVariableLayout
          direction="column"
          fixedElement={<Header />}
          variableElement={
            <FixedAndVariableLayout
              scrollRef={issueListScrollRef}
              fixedElement={
                <S.LabelListLayout>
                  <LabelList />
                </S.LabelListLayout>
              }
              variableElement={
                <S.IssueListLayout ref={issueListContentRef}>
                  <S.IssueListOptionsLayout>
                    <IssueListOptions />
                  </S.IssueListOptionsLayout>

                  <IssueList />
                </S.IssueListLayout>
              }
            />
          }
        />
      </S.MainLayout>
    </IssueListRefsProvider>
  );
}

// components
import { IssueList } from "@/pages/Main/components/IssueList";
import { LabelList } from "@/pages/Main/components/LabelList";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";
import { Header } from "./components/Header";
import { IssueListOptions } from "@/pages/Main/components/IssueListOptions";

// styles
import * as S from "./index.styles";

export function Main() {
  return (
    <S.MainLayout>
      <FixedAndVariableLayout
        direction="column"
        fixedElement={<Header />}
        variableElement={
          <FixedAndVariableLayout
            fixedElement={
              <S.LabelListLayout>
                <LabelList />
              </S.LabelListLayout>
            }
            variableElement={
              <S.IssueListLayout>
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
  );
}

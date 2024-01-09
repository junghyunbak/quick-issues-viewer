// styles
import * as S from "./index.styles";

// components
import { IssueListOptionsStateElement } from "./IssueListOptionsStateElement";
import { IssueListOptionsSortElement } from "./IssueListOptionsSortElement";

export function IssueListOptions() {
  return (
    <S.IssueListOptionsLayout>
      <IssueListOptionsStateElement />
      <IssueListOptionsSortElement />
    </S.IssueListOptionsLayout>
  );
}

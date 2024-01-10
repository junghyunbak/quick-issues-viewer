// react
import React from "react";

// styles
import * as S from "./index.styles";

interface IssueListItemBodyShowCommentsButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function IssueListItemBodyShowCommentsButton(
  props: IssueListItemBodyShowCommentsButtonProps
) {
  return (
    <S.ShowCommentButtonLayout {...props}>
      <S.ShowCommentButtonParagraph>Show comments</S.ShowCommentButtonParagraph>
    </S.ShowCommentButtonLayout>
  );
}

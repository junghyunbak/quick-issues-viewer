// react
import { useMemo, useContext, forwardRef } from "react";
import { IssueContext } from "@/pages/Main/components/IssueList/IssueListItem/index.context";

// components
import { IssueListItemHeaderLabelList } from "./IssueListItemHeaderLabelList";

// styles
import * as S from "./index.styles";

interface IssueListItemHeaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const IssueListItemHeader = forwardRef<
  HTMLDivElement | null,
  IssueListItemHeaderProps
>((props, ref) => {
  const { state, title, comments, created_at, pull_request, reactions } =
    useContext(IssueContext);

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
    <S.IssueListItemHeaderLayout {...props} ref={ref}>
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
});

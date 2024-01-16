// styles
import styled from "@emotion/styled";
import { color, zIndex, device } from "@/assets/styles";

// svgs
import { ReactComponent as IssueOpenedIcon } from "@/assets/svgs/issue-opened.svg";
import { ReactComponent as IssueClosedIcon } from "@/assets/svgs/issue-closed.svg";
import { ReactComponent as PrOpenIcon } from "@/assets/svgs/pr-open.svg";
import { ReactComponent as PrClosedIcon } from "@/assets/svgs/pr-closed.svg";
import { ReactComponent as PrMergedIcon } from "@/assets/svgs/pr-merged.svg";
import { ReactComponent as CommentIcon } from "@/assets/svgs/comment.svg";

export const PrOpen = styled(PrOpenIcon)`
  fill: ${color.success};
`;

export const PrClosed = styled(PrClosedIcon)`
  fill: rgb(207, 34, 46);
`;

export const PrMerged = styled(PrMergedIcon)`
  fill: ${color.complete};
`;

export const IssueOpened = styled(IssueOpenedIcon)`
  fill: ${color.success};
`;

export const IssueClosed = styled(IssueClosedIcon)`
  fill: ${color.complete};
`;

export const IssueListItemHeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.5rem;

  position: sticky;
  top: 0;
  z-index: ${zIndex.ISSUE_ITEM_HEADER};

  background-color: ${color.w};

  border-bottom: 1px solid ${color.g200};

  &:hover {
    @media ${device.canHover} {
      background-color: ${color.g100};
    }
  }

  cursor: pointer;
`;

export const IssueInfoLayout = styled.div`
  display: flex;

  gap: 0.5rem;
`;

export const IssueInfoStatusBox = styled.div`
  padding-left: 0.25rem;
`;

export const IssueInfoTextBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IssueInfoTitleLayout = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.375em;
`;

export const IssueInfoTitleParagraph = styled.p`
  font-weight: 600;
  line-height: 1.5rem;
`;

export const IssueInfoSubTitleParagraph = styled.p`
  color: gray;
  font-size: 0.75rem;
  line-height: 1.5rem;
`;

export const CountingBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.2rem;

  padding: 0 0.25rem 0 0.5rem;
`;

export const Comment = styled(CommentIcon)`
  fill: gray;
`;

export const CountingBoxItem = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
`;

export const CountingBoxItemParagraph = styled.p`
  line-height: 1rem;
  white-space: nowrap;
  font-size: 0.75rem;
  color: gray;
`;

// styles
import styled from "@emotion/styled";
import { color, size } from "@/assets/styles";

// svg
import { ReactComponent as DownIcon } from "@/assets/svgs/down.svg";

// types
import { IssuesSortDirection } from "@/types/issueSearchOptions";

export const SortOptionList = styled.ul`
  display: flex;

  border: 1px solid ${color.g200};
  border-radius: ${size.BORDER_RADIUS}px;

  overflow: hidden;
`;

export const SortOptionListItem = styled.li<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  background-color: ${(props) =>
    props.isActive ? color.active : "transparent"};

  border-left: 1px solid ${color.g200};

  padding: 0.3125rem 0.8rem;

  cursor: pointer;

  &:first-of-type {
    border-left: 0;
  }
`;

export const SortOptionListItemParagraph = styled.p<{ isActive: boolean }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => (props.isActive ? color.w : color.b)};
`;

export const SortOptionsDirection = styled(DownIcon)<{
  isActive: boolean;
  direction: IssuesSortDirection;
}>`
  transform: ${(props) =>
    props.direction === IssuesSortDirection.desc
      ? "rotateX(0deg)"
      : "rotateX(180deg) translateY(-1.95px)"};

  path {
    fill: ${(props) => (props.isActive ? color.w : color.b)};
  }
`;

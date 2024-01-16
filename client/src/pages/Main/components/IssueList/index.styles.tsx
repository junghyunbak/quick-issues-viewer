// styels
import styled from "@emotion/styled";
import { color, device, size } from "@/assets/styles";

export const IssueListLayout = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 1.25rem;

  @media ${device.mobile} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const IssueList = styled.ul`
  width: 100%;

  border: 1px solid ${color.g200};
  border-radius: ${size.BORDER_RADIUS}px;

  @media ${device.mobile} {
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
`;

export const IssueListLoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

export const IssueListPaginateLayout = styled.div`
  padding: 1.25rem 0;
`;

// styles
import styled from "@emotion/styled";
import { size, color, device } from "@/assets/styles";

export const MainLayout = styled.div`
  position: absolute;
  inset: 0;
`;

export const LabelListLayout = styled.div`
  display: flex;

  width: ${size.SIDEBAR_WIDTH}px;
  height: 100%;

  border-right: 1px solid ${color.g200};

  @media ${device.tablet} {
    display: none;
  }
`;

export const IssueListLayout = styled.div`
  display: flex;
  flex-direction: column;

  max-width: ${size.BREAKPOINT_PC}px;
  height: 100%;

  margin: 0 auto;
`;

export const IssueListOptionsLayout = styled.div`
  padding: 1.25rem;
`;

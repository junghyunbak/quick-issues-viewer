// styles
import styled from "@emotion/styled";
import { size, device } from "@/assets/styles";

export const IssueItemLayout = styled.li`
  display: flex;
  flex-direction: column;

  &:first-of-type > div:first-of-type {
    border-top-left-radius: ${size.BORDER_RADIUS}px;
    border-top-right-radius: ${size.BORDER_RADIUS}px;

    @media ${device.mobile} {
      border-radius: 0;
    }
  }

  &:last-of-type > div:last-of-type {
    border-bottom: 0;
    border-bottom-left-radius: ${size.BORDER_RADIUS}px;
    border-bottom-right-radius: ${size.BORDER_RADIUS}px;

    @media ${device.mobile} {
      border-radius: 0;
    }
  }
`;

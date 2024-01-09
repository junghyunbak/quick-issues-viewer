// styles
import styled from "@emotion/styled";
import { size } from "@/assets/styles";

export const IssueItemLayout = styled.div`
  display: flex;
  flex-direction: column;

  /*
  &:first-of-type {
    > div:first-child {
      border-top-right-radius: ${size.BORDER_RADIUS}px;
      border-top-left-radius: ${size.BORDER_RADIUS}px;
    }
  }

  &:last-child {
    border-bottom: 0;

    > div:last-child {
      border-bottom-right-radius: ${size.BORDER_RADIUS}px;
      border-bottom-left-radius: ${size.BORDER_RADIUS}px;

      border-bottom: 0;
    }
  }
  */
`;

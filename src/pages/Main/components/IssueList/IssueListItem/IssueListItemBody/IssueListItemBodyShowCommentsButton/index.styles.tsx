// styles
import styled from "@emotion/styled";
import { color, size } from "@/assets/styles";

export const ShowCommentButtonLayout = styled.div`
  width: 100%;

  background-color: ${color.g100};

  border: 1px solid ${color.g200};
  border-radius: ${size.BORDER_RADIUS}px;

  margin-top: 0.75rem;

  cursor: pointer;

  padding: 0.3125rem 1rem;
`;

export const ShowCommentButtonParagraph = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
`;

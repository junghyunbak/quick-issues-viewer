// styles
import styled from "@emotion/styled";
import { color } from "@/assets/styles";

export const ReactionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ReactionItem = styled.li`
  display: flex;
  align-items: center;

  border-radius: 9999px;
  border: 1px solid ${color.g200};

  padding: 0.125rem 0.5rem;
`;

export const ReactionItemParagraph = styled.p`
  font-size: 0.875rem;
  color: gray;
`;

// styles
import styled from "@emotion/styled";
import { color } from "@/assets/styles";

export const FooterLayout = styled.div`
  display: flex;
  justify-content: flex-end;

  border-top: 1px solid ${color.g200};

  padding: 0.5rem 0.75rem;
`;

export const FooterGuideParagraph = styled.p`
  font-size: 0.75rem;
`;

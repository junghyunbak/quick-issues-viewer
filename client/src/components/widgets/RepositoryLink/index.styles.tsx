// styles
import styled from "@emotion/styled";
import { color, size } from "@/assets/styles";

export const Layout = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkAnchor = styled.a`
  font-size: 0.875rem;
  text-decoration: none;
  color: ${color.b};

  padding: 0.375rem 0.5rem;

  border-radius: ${size.BORDER_RADIUS}px;

  &:hover {
    background-color: ${color.g100};
  }
`;

// styles
import styled from "@emotion/styled";
import { device, size, color } from "@/assets/styles";

export const SearchModalUserListItemLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  cursor: pointer;

  border-radius: ${size.BORDER_RADIUS}px;

  &:hover {
    @media ${device.canHover} {
      background-color: ${color.g100};
    }
  }

  padding: 0.375rem 0.5rem;
`;

export const SearchModalUserListItemImage = styled.img`
  width: 1rem;
  height: 1rem;

  border-radius: 9999px;
`;

export const SearchModalUserListItemParagraph = styled.p`
  font-size: 0.875rem;
`;

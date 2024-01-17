// styles
import styled from "@emotion/styled";
import { device, size, color } from "@/assets/styles";

export const SearchModalUserListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  padding: 0.375rem 0.5rem;

  border-radius: ${size.BORDER_RADIUS}px;

  outline: none;

  cursor: pointer;

  &:focus {
    background-color: ${color.g100};
  }

  &:hover {
    @media ${device.canHover} {
      background-color: ${color.g100};
    }
  }
`;

export const SearchModalUserListItemImage = styled.img`
  width: 1rem;
  height: 1rem;

  border-radius: 9999px;
`;

export const SearchModalUserListItemParagraph = styled.p`
  font-size: 0.875rem;
`;

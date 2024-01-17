// styles
import styled from "@emotion/styled";
import { device, size, color } from "@/assets/styles";

// svgs
import { ReactComponent as RepositoryIcon } from "@/assets/svgs/repository.svg";

export const SearchModalRepoListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  border-radius: ${size.BORDER_RADIUS}px;

  padding: 0.375rem 0.5rem;

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

export const Repository = styled(RepositoryIcon)``;

export const SearchModalRepoListItemParagraph = styled.p`
  font-size: 0.875rem;
`;

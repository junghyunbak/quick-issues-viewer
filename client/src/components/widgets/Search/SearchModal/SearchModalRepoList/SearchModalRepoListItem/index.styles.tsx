// styles
import styled from "@emotion/styled";
import { device, size, color } from "@/assets/styles";

// svgs
import { ReactComponent as RepositoryIcon } from "@/assets/svgs/repository.svg";

export const SearchModalRepoListItem = styled.li`
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

export const Repository = styled(RepositoryIcon)``;

export const SearchModalRepoListItemParagraph = styled.p`
  font-size: 0.875rem;
`;

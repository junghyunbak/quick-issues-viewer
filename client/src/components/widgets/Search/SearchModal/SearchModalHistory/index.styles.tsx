// styles
import styled from "@emotion/styled";
import { color } from "@/assets/styles";

export const SearchModalHistoryListLayout = styled.div``;

export const SearchModalHistoryListHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SearchModalHistoryListHeaderTitleParagraph = styled.p`
  font-size: 0.75rem;
  font-weight: bold;

  padding: 0.375rem 0.5rem;
`;

export const SearchModalHistoryListHeaderRemoveParagraph = styled.p`
  color: ${color.active};
  font-size: 0.75rem;
  font-weight: 600;

  padding: 0.375rem 0.5rem;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SearchModalHistoryList = styled.ul``;

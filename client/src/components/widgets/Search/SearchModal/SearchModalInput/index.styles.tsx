// styles
import styled from "@emotion/styled";
import { color, size } from "@/assets/styles";

// svgs
import { ReactComponent as MagnifierIcon } from "@/assets/svgs/magnifier.svg";

export const SearchInputLayout = styled.div`
  padding: 0.75rem;
`;

export const SearchInputLabel = styled.label`
  display: flex;
  align-items: center;

  border: 1px solid ${color.g200};
  border-radius: ${size.BORDER_RADIUS}px;

  padding: 0.5rem;

  gap: 0.25rem;
`;

export const Magnifier = styled(MagnifierIcon)``;

export const SearchInput = styled.input`
  width: 100%;

  outline: none;
  border: 0;
`;

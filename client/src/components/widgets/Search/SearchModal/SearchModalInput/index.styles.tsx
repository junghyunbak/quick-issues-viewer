// styles
import styled from "@emotion/styled";
import { color, size } from "@/assets/styles";

// svgs
import { ReactComponent as MagnifierIcon } from "@/assets/svgs/magnifier.svg";
import { ReactComponent as CircleXIcon } from "@/assets/svgs/circle-x.svg";

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

export const Magnifier = styled(MagnifierIcon)`
  width: 1rem;
  height: 1rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 1rem;

  font-size: 0.875rem;

  outline: none;
  border: 0;
`;

export const SearchInputUtilBox = styled.div`
  display: flex;
  align-items: center;

  gap: 0.5rem;
`;

export const CircleX = styled(CircleXIcon)`
  cursor: pointer;

  path {
    fill: ${color.g600};
  }
`;

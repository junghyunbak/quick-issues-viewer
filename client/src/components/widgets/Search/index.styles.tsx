// styles
import styled from "@emotion/styled";
import { size, color } from "@/assets/styles";

// svgs
import { ReactComponent as MagnifierIcon } from "@/assets/svgs/magnifier.svg";

export const SearchButtonLayout = styled.div`
  display: flex;
  align-items: center;

  height: 2rem;

  border-radius: ${size.BORDER_RADIUS}px;
  border: 1px solid ${color.g200};

  overflow: hidden;

  cursor: pointer;
`;

export const SearchButtonTextBox = styled.div`
  display: flex;
  align-items: center;

  height: 100%;

  padding: 0 0.75rem;

  border-right: 1px solid ${color.g200};
`;

export const SearchButtonTextParagraph = styled.p`
  font-size: 0.875rem;
  color: ${color.g600};
`;

export const SearchButtonIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 100%;

  background-color: ${color.g100};
`;

export const Magnifier = styled(MagnifierIcon)``;

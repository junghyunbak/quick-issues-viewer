// styles
import styled from "@emotion/styled";
import { color, device, size, zIndex } from "@/assets/styles";

export const SearchModalLayout = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: ${zIndex.SEARCH_MODAL};
`;

export const SearchModalDimmedBox = styled.div`
  position: absolute;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.35);
`;

export const SearchModalContentBox = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;

  width: ${size.BREAKPOINT_TABLET}px;
  max-height: 80%;

  @media ${device.mobile} {
    width: 90%;
  }

  background-color: ${color.w};

  border: 1px solid ${color.g200};
  border-radius: ${size.BORDER_RADIUS * 2}px;

  margin-top: 1%;
`;

export const SearchModalContentSearchResultBox = styled.div`
  overflow-y: auto;

  & > div {
    border-bottom: 1px solid ${color.g200};

    &:last-child {
      border-bottom: 0;
    }

    padding: 0.75rem;

    &:first-of-type {
      padding-top: 0;
    }
  }
`;

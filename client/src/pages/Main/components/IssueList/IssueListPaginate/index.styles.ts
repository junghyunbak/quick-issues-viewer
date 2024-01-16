// styles
import { type ClassNamesContent } from "@emotion/react";
import { color, size, device } from "@/assets/styles";

export const getClassNameStyles = (css: ClassNamesContent["css"]) => ({
  paginateLayout: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.125rem;

    @media ${device.mobile} {
      justify-content: space-between;
    }
  `,

  breakLineBox: css`
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.mobile} {
      display: none;
    }

    padding: 0.5rem 0.8rem;

    cursor: pointer;

    font-size: 0.875rem;

    border: 1px solid transparent;
    border-radius: ${size.BORDER_RADIUS}px;

    &:hover {
      @media ${device.canHover} {
        border: 1px solid ${color.g200};
      }
    }
  `,

  pageLinkBox: css`
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.mobile} {
      display: none;
    }

    padding: 0.5rem 0.8rem;

    cursor: pointer;

    font-size: 0.875rem;

    border: 1px solid transparent;
    border-radius: ${size.BORDER_RADIUS}px;

    &:hover {
      @media ${device.canHover} {
        border: 1px solid ${color.g200};
      }
    }
  `,

  activePageLinkBox: css`
    color: ${color.w};

    background-color: ${color.active};

    &:hover {
      @media ${device.canHover} {
        border: 1px solid transparent;
      }
    }
  `,

  breakBox: css`
    @media ${device.mobile} {
      display: none;
    }
  `,

  previousLinkBox: css`
    padding: 0.5rem 0.8rem;

    display: flex;
    align-items: center;

    font-size: 0.875rem;

    color: ${color.active};

    cursor: pointer;

    border: 1px solid transparent;
    border-radius: ${size.BORDER_RADIUS}px;

    &:hover {
      @media ${device.canHover} {
        border: 1px solid ${color.g200};
      }
    }

    &::before {
      content: "";

      width: 1rem;
      height: 1rem;

      clip-path: polygon(
        9.8px 12.8px,
        8.7px 12.8px,
        4.5px 8.5px,
        4.5px 7.5px,
        8.7px 3.2px,
        9.8px 4.3px,
        6.1px 8px,
        9.8px 11.7px,
        9.8px 12.8px
      );

      background-color: ${color.active};
    }
  `,

  nextLinkBox: css`
    padding: 0.5rem 0.8rem;

    display: flex;
    align-items: center;

    font-size: 0.875rem;

    cursor: pointer;

    color: ${color.active};

    border: 1px solid transparent;
    border-radius: ${size.BORDER_RADIUS}px;

    &:hover {
      @media ${device.canHover} {
        border: 1px solid ${color.g200};
      }
    }

    &::after {
      content: "";

      width: 1rem;
      height: 1rem;

      clip-path: polygon(
        6.2px 3.2px,
        7.3px 3.2px,
        11.5px 7.5px,
        11.5px 8.5px,
        7.3px 12.8px,
        6.2px 11.7px,
        9.9px 8px,
        6.2px 4.3px,
        6.2px 3.2px
      );

      background-color: ${color.active};
    }
  `,

  disabledBox: css`
    a {
      color: ${color.inactive};

      cursor: auto;

      &::after,
      &::before {
        background-color: ${color.inactive};
      }

      &:hover {
        @media ${device.canHover} {
          border: 1px solid transparent;
        }
      }
    }
  `,
});

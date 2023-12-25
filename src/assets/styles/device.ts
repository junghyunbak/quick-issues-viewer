import * as size from "./size";

export const mobile = `(max-width: ${size.BREAKPOINT_TABLET}px)`;

export const tablet = `(min-width: ${
  size.BREAKPOINT_TABLET + 1
}px) and (max-width: ${size.BREAKPOINT_PC}px)`;

export const canHover = "(hover: hover)";

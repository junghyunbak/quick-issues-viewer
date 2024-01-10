// react
import React, { useEffect, useRef } from "react";

// styles
import { css } from "@emotion/react";
import { zIndex } from "@/assets/styles";

interface NonModalProps {
  target: React.MutableRefObject<HTMLElement | null>;

  children: React.ReactNode;

  isOpen: boolean;

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NonModal({
  children,
  target,
  isOpen,
  setIsOpen,
}: NonModalProps) {
  const modal = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const windowClickEventListener = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        modal.current?.contains(e.target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    const windowResizeEventListener = () => {
      if (!target.current || !modal.current) {
        return;
      }

      const { y, height, left, width } = target.current.getBoundingClientRect();

      const inset = `${y + height + 4}px auto auto ${
        left - modal.current.offsetWidth + width
      }px`;

      modal.current.style.inset = inset;
    };

    windowResizeEventListener();

    window.addEventListener("click", windowClickEventListener);

    window.addEventListener("resize", windowResizeEventListener);

    return () => {
      window.removeEventListener("click", windowClickEventListener);

      window.removeEventListener("resize", windowResizeEventListener);
    };
  }, [children, target, setIsOpen]);

  return (
    <div
      css={css`
        position: fixed;
        z-index: ${zIndex.NON_MODAL};
      `}
      ref={modal}
    >
      {isOpen && children}
    </div>
  );
}

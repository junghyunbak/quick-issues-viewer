// react
import React, { useCallback } from "react";

// svgs
import { ReactComponent as Magnifier } from "@/assets/svgs/magnifier.svg";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

interface SearchModalInputProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;

  inputValue: string;

  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchModalInput({
  inputRef,
  inputValue,
  setInputValue,
}: SearchModalInputProps) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  return (
    <div
      css={css`
        padding: 0.75rem;
      `}
    >
      <label
        css={css`
          display: flex;
          align-items: center;

          border: 1px solid ${color.g200};
          border-radius: ${size.BORDER_RADIUS}px;

          padding: 0.5rem;

          gap: 0.25rem;
        `}
      >
        <Magnifier />

        <input
          css={css`
            width: 100%;

            outline: none;
            border: 0;
          `}
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="{owner}/{repo}"
        />
      </label>
    </div>
  );
}

// react
import { useCallback } from "react";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// svgs
import { ReactComponent as Magnifier } from "@/assets/svgs/magnifier.svg";

// zustand
import useStore from "@/store";

export function FilterLabelInput() {
  const [setSearchLabel] = useStore((state) => [state.setSearchLabel]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchLabel(e.target.value);
    },
    [setSearchLabel]
  );

  return (
    <div
      css={css`
        padding: 1.25rem;
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
          onChange={handleInputChange}
          placeholder="label"
        />
      </label>
    </div>
  );
}

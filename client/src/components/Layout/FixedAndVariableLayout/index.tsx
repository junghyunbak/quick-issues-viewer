// react
import { useMemo } from "react";

// styles
import { css } from "@emotion/react";

interface FixedAndVariableLayoutProps {
  fixedElement: React.ReactNode;

  variableElement: React.ReactNode;

  direction?: "row" | "column";

  reverse?: boolean;
}

export function FixedAndVariableLayout({
  fixedElement,
  variableElement,
  direction = "row",
  reverse = false,
}: FixedAndVariableLayoutProps) {
  const flexDirection = useMemo(() => {
    let tmp = direction;

    if (reverse) {
      tmp += "-reverse";
    }

    return tmp;
  }, [direction, reverse]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${flexDirection};

        overflow: auto;

        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          flex-basis: content;

          overflow: auto;
        `}
      >
        {fixedElement}
      </div>

      <div
        css={css`
          flex: 1;

          overflow: auto;
        `}
      >
        {variableElement}
      </div>
    </div>
  );
}

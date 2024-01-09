// react
import { useContext } from "react";
import { IssueContext } from "../../index.context";

// styles
import { css } from "@emotion/react";

// components
import { Label } from "@/components/widgets/Label";

export function IssueListItemHeaderLabelList() {
  const { labels } = useContext(IssueContext);

  return (
    <ul
      css={css`
        display: flex;
        flex-wrap: wrap;

        padding: 0;

        gap: 4px;

        li {
          list-style: none;
        }
      `}
    >
      {labels.map((label) => {
        if (typeof label === "string") {
          return null;
        }

        const { id, name, color } = label;

        if (!id || !name || !color) {
          return null;
        }

        return <Label key={id} labelName={name} labelBgColor={color} />;
      })}
    </ul>
  );
}

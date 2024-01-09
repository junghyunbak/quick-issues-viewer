// react
import { useContext } from "react";
import { IssueContext } from "../../index.context";

// components
import { Label } from "@/components/widgets/Label";

// styles
import * as S from "./index.styles";

export function IssueListItemHeaderLabelList() {
  const { labels } = useContext(IssueContext);

  return (
    <S.LabelList>
      {labels.map((label) => {
        if (typeof label === "string") {
          return null;
        }

        const { id, name, color } = label;

        if (!id || !name || !color) {
          return null;
        }

        return (
          <S.LabelItem key={id}>
            <Label labelName={name} labelBgColor={color} />
          </S.LabelItem>
        );
      })}
    </S.LabelList>
  );
}

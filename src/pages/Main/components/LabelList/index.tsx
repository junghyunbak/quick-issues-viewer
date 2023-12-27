// react
import { useQuery } from "react-query";
import { Blocks } from "react-loader-spinner";
import { useParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";

// apis
import { apiSevice } from "@/apis";

// components
import { LabelListItem } from "./LabelListItem";

export const ALL_SHOW_LABEL_ID = -1;

export function LabelList() {
  const { owner, repo } = useParams();

  const labelList = useQuery(["label", "list", owner, repo], async () => {
    return await apiSevice.getRepoIssueLabelList(owner, repo);
  });

  if (labelList.isError) {
    return null;
  }

  if (labelList.isLoading) {
    return <Blocks />;
  }

  if (!labelList.data) {
    return null;
  }

  return (
    <div
      css={css`
        padding: 1.25rem;
      `}
    >
      {labelList.data && (
        <ul
          css={css`
            padding: 0;
          `}
        >
          <LabelListItem
            label={{
              id: ALL_SHOW_LABEL_ID,
              node_id: "",
              url: "",
              name: "all",
              description: "",
              color: "",
              default: false,
            }}
          />

          {labelList.data.map((label) => {
            return <LabelListItem key={label.id} label={label} />;
          })}
        </ul>
      )}
    </div>
  );
}

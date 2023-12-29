// react
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
    return <Navigate replace to="/404" />;
  }

  if (labelList.isLoading) {
    return (
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          height: 100%;
        `}
      >
        <RotatingLines width="2rem" strokeColor="gray" />
      </div>
    );
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

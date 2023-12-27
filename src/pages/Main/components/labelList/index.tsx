// react
import { useQuery } from "react-query";
import { Blocks } from "react-loader-spinner";
import { useParams } from "react-router-dom";

// zustand
import useStore from "@/store";

// styles
import { css } from "@emotion/react";

// apis
import { apiSevice } from "@/apis";

export function LabelList() {
  const { owner, repo } = useParams();

  const [labelId, setLabelId] = useStore((state) => [
    state.labelId,
    state.setLabelId,
  ]);

  const labelList = useQuery(["label", "list", owner, repo], async () => {
    return await apiSevice.getRepoIssueLabelList(owner, repo);
  });

  const handleLabelClick = (labelId: number | null) => () => {
    setLabelId(labelId);
  };

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
          <li
            css={css`
              list-style: none;
            `}
            onClick={handleLabelClick(null)}
          >
            <p
              css={css`
                text-align: start;

                cursor: pointer;

                text-decoration: ${labelId === null ? "underline" : "none"};
              `}
            >
              전체보기
            </p>
          </li>

          {labelList.data.map((label) => {
            const { id, name } = label;

            return (
              <li
                key={id}
                onClick={handleLabelClick(id)}
                css={css`
                  list-style: none;
                `}
              >
                <p
                  css={css`
                    text-align: start;

                    cursor: pointer;

                    text-decoration: ${id === labelId ? "underline" : "none"};
                  `}
                >
                  {name}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// react
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { useParams, useSearchParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

// utils
import queryString from "query-string";

// components
import { MemoizedLabelListItem } from "./LabelListItem";
import { LabelListFilterInput } from "./LabelListFilterInput";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";
import { Label } from "@/components/widgets/Label";

// hooks
import { useOctokit } from "@/hooks";

export function LabelList() {
  const { owner, repo } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const { label } = queryString.parse(searchParams.toString());

  const { apiService } = useOctokit();

  const labelList = useQuery(["label", "list", owner, repo], async () => {
    return await apiService.getRepoIssueLabelList(owner || "", repo || "");
  });

  const [searchLabel, setSearchLabel] = useState("");

  const handleLabelClick = useCallback(
    (labelName: string) => () => {
      setSearchParams(
        (prev) => {
          prev.delete("page");

          let labels: string | string[] | null = prev.get(
            /**
             * TODO: label -> labels
             */
            "label"
          );

          /**
           * 없을 일이 없지만 방어코드
           */
          if (!labels) {
            return prev;
          }

          labels = labels.split(",");

          const index = labels.indexOf(labelName);

          if (index !== -1) {
            labels.splice(index, 1);

            prev.set("label", labels.join(","));
          }

          return prev;
        },
        {
          replace: true,
        }
      );
    },
    [setSearchParams]
  );

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
    <FixedAndVariableLayout
      direction="column"
      fixedElement={
        <LabelListFilterInput
          inputValue={searchLabel}
          setInputValue={setSearchLabel}
        />
      }
      variableElement={
        <FixedAndVariableLayout
          direction="column"
          fixedElement={
            <div
              css={css`
                border-bottom: 1px solid ${color.g200};
              `}
            >
              {typeof label === "string" && label !== "" && (
                <ul
                  css={css`
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;

                    padding: 1.25rem;
                    padding-top: 0;
                  `}
                >
                  {label
                    .split(",")
                    .map((labelName) => {
                      const item = labelList.data.find(
                        (v) => v.name === labelName
                      );

                      if (!item) {
                        return null;
                      }

                      return {
                        id: item.id,
                        name: item.name,
                        color: item.color,
                      };
                    })
                    .filter((v) => v !== null)
                    .map((v) => {
                      if (v === null) {
                        return null;
                      }

                      return (
                        <li
                          key={v.id}
                          css={css`
                            cursor: pointer;
                          `}
                          onClick={handleLabelClick(v.name)}
                        >
                          <Label labelName={v.name} labelBgColor={v.color} />
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          }
          variableElement={
            <ul
              css={css`
                flex: 1;

                overflow: auto;

                padding: 1.25rem;
              `}
            >
              {labelList.data
                .filter((label) => {
                  return label.name.startsWith(searchLabel);
                })
                .map((label) => {
                  return <MemoizedLabelListItem key={label.id} label={label} />;
                })}
            </ul>
          }
        />
      }
    />
  );
}

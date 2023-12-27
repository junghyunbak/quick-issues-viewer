// react
import { useQuery } from "react-query";
import { Blocks } from "react-loader-spinner";
import { useParams } from "react-router-dom";

// apis
import { apiSevice } from "@/apis";

// styles
import { css } from "@emotion/react";

// components
import { IssueLabelList } from "./IssueLabelList";

export function IssueList() {
  const { owner, repo } = useParams();

  const issueList = useQuery(
    ["issue", "list", owner, repo],
    async () => {
      return await apiSevice.getRepoIssueList(owner, repo);
    },
    {
      onError: (e) => {
        console.log("에러 발생", e);
      },
    }
  );

  if (issueList.isError) {
    return (
      <div>
        <p>해당 레포지토리를 찾을 수 없습니다.</p>
      </div>
    );
  }

  if (issueList.isLoading) {
    return <Blocks />;
  }

  if (!issueList.data) {
    return null;
  }

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      {issueList.data.length > 0 ? (
        <ul>
          {issueList.data.map((issue) => {
            const { id, title, user, labels } = issue;

            return (
              <li
                key={id}
                css={css`
                  display: flex;

                  list-style: none;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  `}
                >
                  <img
                    src={user?.avatar_url}
                    css={css`
                      width: 40px;
                      height: 40px;
                      border-radius: 9999px;
                    `}
                    alt="avatar_image"
                  />

                  <p
                    css={css`
                      margin: 0;
                      font-size: 12px;
                    `}
                  >
                    {user?.login}
                  </p>
                </div>

                <p>{title}</p>

                <IssueLabelList labels={labels} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
}

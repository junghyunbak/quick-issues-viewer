// react
import { useQuery } from "react-query";
import { Blocks } from "react-loader-spinner";
import { useParams } from "react-router-dom";

// apis
import { apiSevice } from "@/apis";

// styles
import { css } from "@emotion/react";

// utils
import { findContrastColor } from "@/utils/color";

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
    <div>
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

                <div>
                  <p>{title}</p>
                  <ul
                    css={css`
                      display: flex;

                      padding: 0;

                      gap: 4px;

                      li {
                        list-style: none;
                      }
                    `}
                  >
                    {labels.map((label, i) => {
                      if (typeof label === "string") {
                        return <li key={i}>{label}</li>;
                      }

                      const { id, name, color } = label;

                      return (
                        <li
                          key={id}
                          css={css`
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            background-color: #${color};

                            padding: 0 7px;

                            border-radius: 2rem;
                          `}
                        >
                          <span
                            css={css`
                              font-size: 12px;
                              line-height: 18px;
                              font-weight: 500;
                              color: #${findContrastColor(color || "ffffff")};
                            `}
                          >
                            {name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
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

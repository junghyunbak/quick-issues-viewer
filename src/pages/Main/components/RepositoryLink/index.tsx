// react
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// apis
import { apiSevice } from "@/apis";

export function RepositoryLink() {
  const { owner, repo } = useParams();

  const repoInfo = useQuery(["repo", "info", owner, repo], async () => {
    return await apiSevice.getRepoInfo(owner || "", repo || "");
  });

  if (!repoInfo.data) {
    return null;
  }

  return (
    <div
      css={css`
        display: flex;
        align-items: center;

        a {
          font-size: 0.875rem;
          text-decoration: none;
          color: ${color.b};

          padding: 0.375rem 0.5rem;

          border-radius: ${size.BORDER_RADIUS}px;

          &:hover {
            background-color: ${color.g100};
          }
        }
      `}
    >
      <a href={repoInfo.data.owner.html_url} target="__blank">
        {repoInfo.data.owner.login}
      </a>

      <span>/</span>

      <a href={repoInfo.data.html_url} target="__blank">
        {repoInfo.data.name}
      </a>
    </div>
  );
}

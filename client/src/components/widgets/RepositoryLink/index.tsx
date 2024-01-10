// react
import { useParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

export function RepositoryLink() {
  const { owner, repo } = useParams();

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
      <a href={`https://github.com/${owner}`} target="__blank">
        {owner}
      </a>

      <span>/</span>

      <a href={`https://github.com/${owner}/${repo}/issues`} target="__blank">
        {repo}
      </a>
    </div>
  );
}

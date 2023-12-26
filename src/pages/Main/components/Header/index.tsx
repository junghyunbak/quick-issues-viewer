// react
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

// components
import { Search } from "@/components/widgets/Search";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

import { Octokit } from "octokit";

const octokit = new Octokit();

export function Header() {
  const { owner } = useParams();

  const user = useQuery(["user", "info", owner], async () => {
    if (!owner) {
      return null;
    }

    const { data } = await octokit.rest.users.getByUsername({
      username: owner,
    });

    return data;
  });

  return (
    <div
      css={css`
        display: flex;
        align-items: center;

        justify-content: space-between;

        padding: 1.25rem;

        border-bottom: 1px solid ${color.g200};
      `}
    >
      <div>
        {user.data && (
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `}
          >
            <img
              css={css`
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 9999px;
              `}
              src={user.data.avatar_url}
              alt="profileImage"
            />
            <span
              css={css`
                font-weight: 500;
              `}
            >
              {user.data.login}
            </span>
          </div>
        )}
      </div>

      <Search />
    </div>
  );
}

// react
import React from "react";

// components
import { SearchModalRepoListItem } from "./SearchModalRepoListItem";

// styles
import { css } from "@emotion/react";

// apis
import { type components } from "@octokit/openapi-types";

interface SearchModalRepoListProps {
  repoList: components["schemas"]["minimal-repository"][];

  inputValue: string;

  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModalRepoList({
  repoList,
  inputValue,
  setIsModalOpen,
}: SearchModalRepoListProps) {
  return (
    <div
      css={css`
        padding: 1.25rem;
      `}
    >
      <ul>
        {repoList
          .filter((repo) => {
            const repoName = repo.full_name.split("/")[1];

            const searchRepo = inputValue.split("/")[1];

            if (searchRepo === undefined) {
              return true;
            }

            return repoName.startsWith(searchRepo);
          })
          .map((repo) => {
            const { id, full_name } = repo;

            return (
              <SearchModalRepoListItem
                key={id}
                fullName={full_name}
                setIsModalOpen={setIsModalOpen}
              />
            );
          })}
      </ul>
    </div>
  );
}

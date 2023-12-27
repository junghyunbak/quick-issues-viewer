// react
import React from "react";
import { useQuery } from "react-query";

// components
import { SearchModalRepoListItem } from "./SearchModalRepoListItem";

// styles
import { css } from "@emotion/react";

// apis
import { apiSevice } from "@/apis";

interface SearchModalRepoListProps {
  inputValue: string;

  searchValue: string;

  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModalRepoList({
  inputValue,
  searchValue,
  setIsModalOpen,
}: SearchModalRepoListProps) {
  const [owner] = searchValue.split("/");

  const repoList = useQuery(["search", "repos", owner], async () => {
    if (owner === "") {
      return null;
    }

    try {
      const repoList = await apiSevice.getRepoList(owner);

      return repoList;
    } catch (e) {
      return null;
    }
  });

  if (!repoList.data) {
    return null;
  }

  return (
    <div
      css={css`
        padding: 0.75rem;
      `}
    >
      <p
        css={css`
          font-size: 0.75rem;
          font-weight: bold;

          padding: 0.375rem 0.5rem;
        `}
      >
        repository
      </p>

      <ul>
        {repoList.data
          .filter((repo) => {
            const repoName = repo.full_name.split("/")[1];

            const searchRepo = inputValue.split("/")[1];

            if (searchRepo === undefined) {
              return true;
            }

            return repoName.startsWith(searchRepo);
          })
          .map((repo) => {
            return (
              <SearchModalRepoListItem
                key={repo.id}
                repository={repo}
                setIsModalOpen={setIsModalOpen}
              />
            );
          })}
      </ul>
    </div>
  );
}

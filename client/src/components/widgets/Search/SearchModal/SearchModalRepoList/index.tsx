// react
import React from "react";
import { useQuery } from "react-query";

// components
import { SearchModalRepoListItem } from "./SearchModalRepoListItem";

// styles
import { css } from "@emotion/react";

// hooks
import { useOctokit } from "@/hooks";

// apis
import { RequestError } from "octokit";

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
  const { apiService } = useOctokit();

  const [owner] = searchValue.split("/");

  const repos = useQuery(["search", "repos", owner], async () => {
    try {
      const repos = await apiService.getRepos(owner);

      return repos;
    } catch (e) {
      if (!(e instanceof RequestError)) {
        return null;
      }

      if (e.status === 403) {
        throw e;
      } else {
        return null;
      }
    }
  });

  if (!repos.data || !repos.data.length) {
    return null;
  }

  return (
    <div>
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
        {repos.data
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

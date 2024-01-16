// react
import React from "react";
import { useQuery } from "react-query";

// components
import { SearchModalRepoListItem } from "./SearchModalRepoListItem";

// styles
import * as S from "./index.styles";

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
    <S.SearchModalRepoListLayout>
      <S.SearchModalRepoListTitleParagraph>
        repository
      </S.SearchModalRepoListTitleParagraph>

      <S.SearchModalRepoList>
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
      </S.SearchModalRepoList>
    </S.SearchModalRepoListLayout>
  );
}

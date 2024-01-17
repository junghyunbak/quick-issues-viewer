// react
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { InputContext } from "@/components/widgets/Search/SearchModal/index.context";

// zustand
import useStore from "@/store";

// components
import { SearchModalRepoListItem } from "./SearchModalRepoListItem";

// styles
import * as S from "./index.styles";

// hooks
import { useOctokit } from "@/hooks";

// apis
import { RequestError } from "octokit";

interface SearchModalRepoListProps {
  searchValue: string;
}

export function SearchModalRepoList({ searchValue }: SearchModalRepoListProps) {
  const { inputValue } = useContext(InputContext);

  const { apiService } = useOctokit();

  const [setRepoSearching] = useStore((state) => [state.setRepoSearching]);

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

  useEffect(() => {
    setRepoSearching(repos.isLoading);
  }, [repos.isLoading, setRepoSearching]);

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
            const { id, full_name } = repo;

            return (
              <SearchModalRepoListItem
                key={repo.id}
                id={id}
                fullName={full_name}
              />
            );
          })}
      </S.SearchModalRepoList>
    </S.SearchModalRepoListLayout>
  );
}

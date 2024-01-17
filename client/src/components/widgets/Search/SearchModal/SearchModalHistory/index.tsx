// react
import React, { useCallback } from "react";

// zustand
import useStore from "@/store";

// components
import { SearchModalUserListItem } from "../SearchModalUserList/SearchModalUserListItem";
import { SearchModalRepoListItem } from "../SearchModalRepoList/SearchModalRepoListItem";

// styles
import * as S from "./index.styles";

export function SearchModalHistory() {
  const [searchHistory, setSearchHistory] = useStore((state) => [
    state.searchHistory,
    state.setSearchHistory,
  ]);

  const handleRemoveHistoryButtonClick = useCallback(() => {
    setSearchHistory(() => {
      return [];
    });
  }, [setSearchHistory]);

  return (
    <S.SearchModalHistoryListLayout>
      <S.SearchModalHistoryListHeaderBox>
        <S.SearchModalHistoryListHeaderTitleParagraph>
          Recent
        </S.SearchModalHistoryListHeaderTitleParagraph>

        {searchHistory.length > 0 && (
          <S.SearchModalHistoryListHeaderRemoveParagraph
            onClick={handleRemoveHistoryButtonClick}
          >
            Remove all
          </S.SearchModalHistoryListHeaderRemoveParagraph>
        )}
      </S.SearchModalHistoryListHeaderBox>

      <S.SearchModalHistoryList>
        {searchHistory
          .sort((a, b) => (a.createAt > b.createAt ? -1 : 1))
          .map((searchHistoryItem) => {
            const { id, name, url, type } = searchHistoryItem;

            if (type === "repo") {
              return (
                <SearchModalRepoListItem key={id} id={id} fullName={name} />
              );
            } else if (type === "user") {
              return (
                <SearchModalUserListItem
                  key={id}
                  id={id}
                  login={name}
                  avatar_url={url || ""}
                />
              );
            } else {
              return null;
            }
          })}
      </S.SearchModalHistoryList>
    </S.SearchModalHistoryListLayout>
  );
}

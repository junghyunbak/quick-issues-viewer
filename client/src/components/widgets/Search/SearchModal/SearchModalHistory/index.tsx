// react
import React from "react";

// zustand
import useStore from "@/store";

// components
import { SearchModalUserListItem } from "../SearchModalUserList/SearchModalUserListItem";
import { SearchModalRepoListItem } from "../SearchModalRepoList/SearchModalRepoListItem";

interface SearchModalHistoryProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModalHistory({
  setInputValue,
  setIsModalOpen,
}: SearchModalHistoryProps) {
  const [searchHistory] = useStore((state) => [state.searchHistory]);

  return (
    <ul>
      {searchHistory
        .sort((a, b) => (a.createAt > b.createAt ? -1 : 1))
        .map((searchHistoryItem) => {
          const { id, name, url, type } = searchHistoryItem;

          if (type === "repo") {
            return (
              <SearchModalRepoListItem
                key={id}
                id={id}
                full_name={name}
                setIsModalOpen={setIsModalOpen}
              />
            );
          } else if (type === "user") {
            return (
              <SearchModalUserListItem
                key={id}
                id={id}
                login={name}
                avatar_url={url || ""}
                setInputValue={setInputValue}
              />
            );
          } else {
            return null;
          }
        })}
    </ul>
  );
}

// react
import React, { useRef, useState } from "react";

// styles
import { css } from "@emotion/react";

// zustand
import useStore from "@/store";

export function GithubRepoInfoSelector() {
  const [owner, setOwner] = useStore((state) => [state.owner, state.setOwner]);
  const [repo, setRepo] = useStore((state) => [state.repo, state.setRepo]);

  const [_owner, _setOwner] = useState(owner);
  const [_repo, _setRepo] = useState(repo);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateGithubRepoInfo = (o: string, r: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setOwner(o);
      setRepo(r);
    }, 1500);
  };

  const handleOwnerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setOwner(e.target.value);

    updateGithubRepoInfo(e.target.value, _repo);
  };

  const handleRepoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setRepo(e.target.value);

    updateGithubRepoInfo(_owner, e.target.value);
  };

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      `}
    >
      <label>
        Owner:
        <input
          css={css`
            border: 0;
            font-size: 2rem;
          `}
          type="text"
          onChange={handleOwnerInputChange}
          value={_owner}
        />
      </label>

      <label>
        Repo:
        <input
          css={css`
            border: 0;
            font-size: 1.5rem;
          `}
          type="text"
          onChange={handleRepoInputChange}
          value={_repo}
        />
      </label>
    </div>
  );
}

// react
import { useState, Fragment, useRef } from "react";
import { useQuery } from "react-query";

// components
import { Search } from "@/components/widgets/Search";
import { LabelListModal } from "@/pages/Main/components/LabelListModal";
import { RepositoryLink } from "@/pages/Main/components/RepositoryLink";
import { GithubLoginButton } from "@/components/core/Button/GithubLoginButton";
import { LogoutButton } from "@/components/core/Button/LogoutButton";
import { ProfileButton } from "@/components/core/Button/ProfileButton";
import { NonModal } from "@/components/Overlay/NonModal";
import { HamburgerMenuButton } from "@/components/core/Button/HamburgerMenuButton";

// styles
import { css } from "@emotion/react";
import { size, color, device } from "@/assets/styles";

// hooks
import { useOctokit } from "@/hooks";

// apis
import axios from "axios";

export function Header() {
  const { apiService } = useOctokit();

  const profileButton = useRef<HTMLDivElement | null>(null);

  const [labelListModalIsOpen, setLabelListModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const user = useQuery(["auth", "user"], async () => {
    return await apiService.getAuthenticatedUserInfo();
  });

  const handleMemuButtonClick = () => {
    setLabelListModalIsOpen(true);
  };

  const handleProfileButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalIsOpen((prev) => !prev);

    e.stopPropagation();
  };

  const handleLoginButtonClick = async () => {
    localStorage.setItem("redirect_from", window.location.href);

    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=Iv1.1eb8f2908f40728f";
  };

  const handleLogoutButtonClick = async () => {
    await axios.post("/api/oauth/logout");

    window.location.reload();
  };

  return (
    <Fragment>
      <div
        css={css`
          display: flex;
          justify-content: space-between;

          padding: 1rem;

          border-bottom: 1px solid ${color.g200};
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={css`
              @media ${device.pc} {
                display: none;
              }
            `}
          >
            <HamburgerMenuButton onClick={handleMemuButtonClick} />
          </div>

          <div
            css={css`
              @media ${device.tablet} {
                display: none;
              }
            `}
          >
            <RepositoryLink />
          </div>
        </div>

        <div
          css={css`
            display: flex;
            gap: 0.5rem;
          `}
        >
          <Search />

          <div ref={profileButton} onClick={handleProfileButtonClick}>
            {user.isLoading ? (
              <div
                css={css`
                  width: 2rem;
                  height: 2rem;
                `}
              />
            ) : user.data ? (
              <div
                css={css`
                  width: 2rem;
                  height: 2rem;

                  border-radius: 9999px;

                  overflow: hidden;

                  cursor: pointer;
                `}
              >
                <img
                  src={user.data.avatar_url}
                  css={css`
                    width: 100%;
                    height: 100%;
                  `}
                />
              </div>
            ) : (
              <ProfileButton />
            )}
          </div>

          <NonModal
            target={profileButton}
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
          >
            <div
              css={css`
                padding: 0.5rem;

                background-color: ${color.w};

                border-radius: ${size.BORDER_RADIUS * 2}px;

                box-shadow: rgba(31, 35, 40, 0.12) 0px 1px 3px 0px,
                  rgba(66, 74, 83, 0.12) 0px 8px 24px 0px;
              `}
            >
              {user ? (
                <LogoutButton onClick={handleLogoutButtonClick} />
              ) : (
                <GithubLoginButton onClick={handleLoginButtonClick} />
              )}
            </div>
          </NonModal>
        </div>
      </div>

      {labelListModalIsOpen && (
        <LabelListModal setIsOpen={setLabelListModalIsOpen} />
      )}
    </Fragment>
  );
}

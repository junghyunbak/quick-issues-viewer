// react
import { useState, Fragment, useRef, useEffect } from "react";

// components
import { Search } from "@/components/widgets/Search";
import { LabelListModal } from "@/pages/Main/components/LabelListModal";
import { RepositoryLink } from "@/pages/Main/components/RepositoryLink";
import { GithubLoginButton } from "@/components/widgets/GithubLoginButton";
import { NonModal } from "@/components/Overlay/NonModal";

// styles
import { css } from "@emotion/react";
import { size, color, device } from "@/assets/styles";

// svgs
import { ReactComponent as Hamburger } from "@/assets/svgs/hamburger.svg";
import { ReactComponent as User } from "@/assets/svgs/user.svg";

// hooks
import { useOctokit } from "@/hooks";

// apis
import axios from "axios";
import { type components } from "@octokit/openapi-types";

export function Header() {
  const { apiService } = useOctokit();

  const logInOutButton = useRef<HTMLDivElement | null>(null);

  const [labelListModalIsOpen, setLabelListModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState<components["schemas"]["public-user"] | null>(
    null
  );

  useEffect(() => {
    apiService.getAuthenticatedUserInfo().then((res) => setUser(res));
  }, [apiService, setUser]);

  const handleMemuButtonClick = () => {
    setLabelListModalIsOpen(true);
  };

  const handleLogInOutButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalIsOpen((prev) => !prev);

    e.stopPropagation();
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
              display: flex;
              align-items: center;
              justify-content: center;

              padding: 0.5rem;

              cursor: pointer;

              border-radius: ${size.BORDER_RADIUS}px;

              &:hover {
                @media ${device.canHover} {
                  background-color: ${color.g100};
                }
              }

              @media ${device.pc} {
                display: none;
              }
            `}
            onClick={handleMemuButtonClick}
          >
            <Hamburger />
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

          <div
            css={css`
              width: 2rem;
              height: 2rem;

              cursor: pointer;
            `}
            ref={logInOutButton}
            onClick={handleLogInOutButtonClick}
          >
            {user ? (
              <div
                css={css`
                  width: 100%;
                  height: 100%;

                  border-radius: 9999px;

                  overflow: hidden;
                `}
              >
                <img
                  src={user.avatar_url}
                  css={css`
                    width: 100%;
                    height: 100%;
                  `}
                />
              </div>
            ) : (
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: center;

                  width: 100%;
                  height: 100%;

                  background-color: ${color.g100};
                  border: 1px solid ${color.g200};
                  border-radius: ${size.BORDER_RADIUS}px;
                `}
              >
                <User />
              </div>
            )}
          </div>

          <NonModal
            target={logInOutButton}
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
                <div
                  css={css`
                    padding: 0.5rem;

                    border-radius: ${size.BORDER_RADIUS}px;

                    cursor: pointer;

                    &:hover {
                      background-color: ${color.g100};
                    }
                  `}
                  onClick={handleLogoutButtonClick}
                >
                  <p
                    css={css`
                      font-size: 0.875rem;
                      white-space: nowrap;
                    `}
                  >
                    Logout
                  </p>
                </div>
              ) : (
                <GithubLoginButton />
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

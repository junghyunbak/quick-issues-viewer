// react
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// constants
import { device, size, color } from "@/assets/styles";

// styles
import { css } from "@emotion/react";

// svgs
import { ReactComponent as Repository } from "@/assets/svgs/repository.svg";

interface SearchModalItemProps {
  fullName: string;

  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModalItem({
  fullName,
  setIsModalOpen,
}: SearchModalItemProps) {
  const navigate = useNavigate();

  const handleItemClick = useCallback(() => {
    const [owner, repo] = fullName.split("/");

    navigate(`/${owner}/${repo}`);

    setIsModalOpen(false);
  }, [navigate, fullName, setIsModalOpen]);

  return (
    <li
      css={css`
        display: flex;
        align-items: center;
        gap: 0.375rem;

        cursor: pointer;

        border-radius: ${size.BORDER_RADIUS}px;

        &:hover {
          @media ${device.canHover} {
            background-color: ${color.g100};
          }
        }

        padding: 0.375rem 0.5rem;

        font-size: 0.875rem;
      `}
      onClick={handleItemClick}
    >
      <Repository />

      <p>{fullName}</p>
    </li>
  );
}

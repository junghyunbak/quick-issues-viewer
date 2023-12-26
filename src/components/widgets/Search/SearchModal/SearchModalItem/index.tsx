// react
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// constants
import { device, size, color } from "@/assets/styles";

// styles
import { css } from "@emotion/react";

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
  }, [navigate, fullName]);

  return (
    <li
      css={css`
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
      <p>{fullName}</p>
    </li>
  );
}

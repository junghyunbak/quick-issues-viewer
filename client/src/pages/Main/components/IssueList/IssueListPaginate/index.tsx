// react
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// styles
import { ClassNames } from "@emotion/react";
import { getClassNameStyles } from "./index.styles";

// utils
import queryString from "query-string";

interface IssueListPaginateProps {
  pageCount: number;
}

export function IssueListPaginate({ pageCount }: IssueListPaginateProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { page } = queryString.parse(searchParams.toString());

  const handlePageClick = useCallback<
    Required<ReactPaginateProps>["onPageChange"]
  >(
    (selectedItem): void => {
      setSearchParams((prev) => {
        prev.set("page", (selectedItem.selected + 1).toString());

        return prev;
      });
    },
    [setSearchParams]
  );

  const pageIndex = useMemo(() => {
    if (pageCount === 0) {
      return undefined;
    }

    if (!page) {
      return 0;
    }

    if (isNaN(Number(page))) {
      return undefined;
    }

    return Number(page) - 1;
  }, [page, pageCount]);

  return (
    <ClassNames>
      {({ css }) => {
        const styles = getClassNameStyles(css);

        return (
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            forcePage={pageIndex}
            className={styles.paginateLayout}
            breakLinkClassName={styles.breakLineBox}
            pageLinkClassName={styles.pageLinkBox}
            activeLinkClassName={styles.activePageLinkBox}
            breakClassName={styles.breakBox}
            previousLinkClassName={styles.previousLinkBox}
            nextLinkClassName={styles.nextLinkBox}
            disabledClassName={styles.disabledBox}
          />
        );
      }}
    </ClassNames>
  );
}

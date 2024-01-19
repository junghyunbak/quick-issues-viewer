import { type Octokit } from "octokit";
import { type components } from "@octokit/openapi-types";

import {
  IssuesState,
  IssuesSort,
  IssuesSortDirection,
} from "@/types/issueSearchOptions";

import parseLink from "parse-link-header";

declare namespace parseLinkHeader {
  interface Link {
    page: string;
    per_page: string;
  }

  interface Links {
    first?: Link;
    prev?: Link;
    next?: Link;
    last?: Link;
  }
}

const isLastPage = (pageLinks: parseLinkHeader.Links): boolean => {
  if (Object.keys(pageLinks).length !== 2) {
    return false;
  }

  if (!pageLinks.first) {
    return false;
  }

  if (!pageLinks.prev) {
    return false;
  }

  return true;
};

const getPageCount = (
  pageLinks: parseLinkHeader.Links | null,
  dataLength: number
): number => {
  if (!pageLinks) {
    return dataLength === 0 ? 0 : 1;
  }

  if (isLastPage(pageLinks) && pageLinks.prev) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  } else {
    return 1;
  }
};

export function get(octokit: Octokit) {
  return {
    getRepoIssueList: async (
      owner: string,
      repo: string,
      labels: string[],
      perPage: number,
      page: number,
      state: IssuesState,
      sort: IssuesSort,
      direction: IssuesSortDirection
    ): Promise<{
      pageCount: number;
      items: components["schemas"]["issue-search-result-item"][];
    }> => {
      const queries = [`type:issue`, `repo:${owner}/${repo}`];

      labels.forEach((label) => {
        queries.push(`label:"${label}"`);
      });

      if (state !== "all") {
        queries.push(`state:${state}`);
      }

      const response = await octokit.rest.search.issuesAndPullRequests({
        q: queries.join("+"),
        per_page: perPage,
        page,
        sort,
        order: direction,
      });

      const {
        data: { total_count, items },
      } = response;

      /**
       * search api가 최대 1천개의 데이터를 제공해줌에 따라
       * 페이지 개수를 최대 `1000 / perPage` 값으로 제한
       */
      return {
        pageCount: Math.min(Math.ceil(total_count / perPage), 1000 / perPage),
        items,
      };
    },
    getRepoIssueLabelList: async (
      owner: string,
      repo: string
    ): Promise<components["schemas"]["label"][]> => {
      const labels: components["schemas"]["label"][] = [];

      let page = 1;
      let pageLinks = null;

      do {
        const response = await octokit.rest.issues.listLabelsForRepo({
          owner,
          repo,
          per_page: 100,
          page,
        });

        const {
          data,
          headers: { link },
        } = response;

        labels.push(...data);

        pageLinks = parseLink(link);

        page += 1;
      } while (pageLinks && !isLastPage(pageLinks));

      return labels;
    },
    getRepos: async (
      owner: string
    ): Promise<components["schemas"]["minimal-repository"][] | null> => {
      if (owner === "") {
        return null;
      }

      const { data } = await octokit.rest.repos.listForUser({
        username: owner,
        per_page: 100,
      });

      return data;
    },
    getUsers: async (
      owner: string
    ): Promise<components["schemas"]["user-search-result-item"][] | null> => {
      if (owner === "") {
        return null;
      }

      const queries: string[] = [`${owner} in:login`];

      const {
        data: { items },
      } = await octokit.rest.search.users({
        q: queries.join("+"),
        per_page: 5,
      });

      return items;
    },
    getAuthenticatedUserInfo: async (): Promise<
      components["schemas"]["public-user"] | null
    > => {
      try {
        const { data } = await octokit.rest.users.getAuthenticated();

        return data;
      } catch (e) {
        return null;
      }
    },
    getRepoInfo: async (
      owner: string,
      repo: string
    ): Promise<components["schemas"]["simple-repository"]> => {
      const { data } = await octokit.rest.repos.get({
        owner,
        repo,
      });

      return data;
    },

    getIssueComments: async (
      owner: string,
      repo: string,
      issueNumber: number
    ): Promise<components["schemas"]["issue-comment"][]> => {
      const comments: components["schemas"]["issue-comment"][] = [];

      let page = 1;
      let pageLinks = null;

      do {
        const response = await octokit.rest.issues.listComments({
          owner,
          repo,
          issue_number: issueNumber,
          per_page: 100,
          page,
        });

        const {
          data,
          headers: { link },
        } = response;

        comments.push(...data);

        pageLinks = parseLink(link);

        page += 1;
      } while (pageLinks && !isLastPage(pageLinks));

      return comments;
    },
  };
}

import { Octokit } from "octokit";

export const octokit = new Octokit();

export const getRepoIssueList = async (
  owner: string = "",
  repo: string = "",
  label: string
) => {
  const queries = [`type:issue`, `repo:${owner}/${repo}`];

  if (label) {
    queries.push(`label:${label}`);
  }

  const {
    data: { items },
  } = await octokit.rest.search.issuesAndPullRequests({
    q: queries.join("+"),
  });

  return items;
};

export const getRepoIssueLabelList = async (
  owner: string = "",
  repo: string = ""
) => {
  const response = await octokit.rest.issues.listLabelsForRepo({
    owner,
    repo,
  });

  return response.data;
};

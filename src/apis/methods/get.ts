import { Octokit } from "octokit";

export const octokit = new Octokit();

export const getRepoIssueList = async (
  owner: string = "",
  repo: string = ""
) => {
  const response = await octokit.rest.issues.listForRepo({
    owner,
    repo,
  });

  return response.data;
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

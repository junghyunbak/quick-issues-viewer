import { useContext, useMemo } from "react";
import { OctokitContext } from "@/pages/components/OctokitProvider";
import { get } from "@/apis/methods/get";

export const useOctokit = () => {
  const { octokit, accessToken, setAccessToken } = useContext(OctokitContext);

  const apiService = useMemo(() => {
    return {
      ...get(octokit),
    };
  }, [octokit]);

  return { apiService, accessToken, setAccessToken };
};

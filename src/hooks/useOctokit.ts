import { useContext, useMemo } from "react";
import { OctokitContext } from "@/pages/components/OctokitProvider";
import { get } from "@/apis/methods/get";

export const useOctokit = () => {
  const { octokit, setAccessToken } = useContext(OctokitContext);

  const apiSevice = useMemo(() => {
    return {
      ...get(octokit),
    };
  }, [octokit]);

  return { apiSevice, setAccessToken };
};

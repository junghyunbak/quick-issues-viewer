// zustand
import useStore from "@/store";

export function NotFound() {
  const { owner, repo } = useStore((state) => ({
    owner: state.owner,
    repo: state.repo,
  }));

  return (
    <div>
      <p>
        <b>
          {owner}/{repo}
        </b>{" "}
        저장소를 찾을 수 없음.
      </p>
    </div>
  );
}

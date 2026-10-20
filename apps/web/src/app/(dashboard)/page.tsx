import { firstCommit } from "@roteirizador/backend";

export default function Home() {
  return (
    <div>
      <span>{firstCommit()}</span>
    </div>
  );
}

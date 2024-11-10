import { getAllMDXFiles } from "@/lib/github";
import Main from "./Main";

export default async function Page() {
  const posts = await getAllMDXFiles();
  return <Main posts={posts} />;
}

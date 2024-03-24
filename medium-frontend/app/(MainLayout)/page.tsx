import Blogs from "@/components/Blogs/Blogs";
import Sidebar from "@/components/common/Sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const data = await getServerSession(authOptions);
  return (
    <div className="min-h-[calc(100vh-70px)] max-w-[1250px] grid grid-cols-1 md:grid-cols-[70%_1fr] gap-5 mx-auto pt-10 w-11/12">
      <Blogs />
      <div className="w-full h-full hiddem md:flex">
        <Sidebar />
      </div>
    </div>
  );
}

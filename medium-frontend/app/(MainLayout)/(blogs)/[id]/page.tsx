import BlogActionComponent from "@/components/Blogs/BlogActionComponent";
import { formatedDate, urls } from "@/lib/utils";
import React from "react";

const getData = async (id: string) => {
  const res = await fetch(`${urls.BACKEND_URL}/api/v1/posts/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const { post } = await getData(id);

  return (
    <>
      <div className="max-w-[850px] mx-auto w-11/12 pt-10">
        <p className="text-3xl font-extrabold capitalize my-10">{post.title}</p>
        {/* author section */}
        <div className="flex gap-3 my-5">
          {/* <div><Image/></div> */}
          <div className="">
            <p className="font-medium capitalize">
              {post.author.firstName} {post.author.lastName}
            </p>
            <p className="text-gray-400">{formatedDate(post.createdAt)}</p>
          </div>
        </div>
        <BlogActionComponent />

        <div className="my-10">{post.content}</div>
      </div>
    </>
  );
}

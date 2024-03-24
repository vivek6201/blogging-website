import React from "react";
import { Blog } from "./Blogs";
import Image from "next/image";
import { formatedDate } from "@/lib/utils";

export default function BlogCard({ post }: { post: Blog }) {


  return (
    <div className="p-5 rounded-md border border-gray-600">
      <div className="flex gap-2 font-light ">
        {/* <Image/> */}
        <p className="text-xs">
          {post.author.firstName} {post.author.lastName}
        </p>
        <p className="text-xs">{formatedDate(post.createdAt)}</p>
      </div>
      <p className="font-bold text-xl">{post.title}</p>
      <p className="mt-2">{post.content.slice(0, 100)}...</p>
    </div>
  );
}
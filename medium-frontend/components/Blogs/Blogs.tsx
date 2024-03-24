"use client";
import { fetcher, urls } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";
import useSWR from "swr";
import BlogCard from "./BlogCard";
import Link from "next/link";

interface Author {
  firstName: string;
  lastName: string;
}

export interface Blog {
  authorId: string;
  content: string;
  id: string;
  published: boolean;
  title: string;
  thumbnail: string | null;
  author: Author;
  createdAt: string;
}

export default function Blogs() {
  const {
    isLoading,
    data: blogs,
    error,
  } = useSWR(`${urls.BACKEND_URL}/api/v1/posts/all`, fetcher);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  const posts: Blog[] = blogs.posts;
  console.log(posts);

  return (
    <div className="flex flex-col gap-y-2">
      {posts.map((post: Blog) => (
        <Link href={`/${post.id}`}>
          <BlogCard post={post} key={post.id} />
        </Link>
      ))}
    </div>
  );
}

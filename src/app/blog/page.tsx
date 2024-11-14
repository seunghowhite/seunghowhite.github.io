import React from "react";

import { getPostPaths } from "@/lib/post";
import { sync } from "glob";
import path from "path";

type Props = {
  params: { category: string };
};

export function generateStaticParams() {
  const categoryList = getPostPaths();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

const BlogPage = async ({ params: { category } }: Props) => {
  const paths = getPostPaths();
  console.log("paths: ", paths);
  const folder = category || "**";
  const BASE_PATH = "/src/_posts";
  const POSTS_PATH = path.join(process.cwd(), BASE_PATH);
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  console.log("postPaths: ", postPaths);
  return <div className="post">BlogPage</div>;
};

export default BlogPage;

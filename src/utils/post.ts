import { sync } from "glob";
import path from "path";

const BASE_PATH = "/src/_posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);
// 모든 MDX 파일 조회
export const getPostPaths = (category?: string) => {
  const folder = category || "**";
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return postPaths;
};

export const getAllPosts = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`);
  return postPaths.map((path) => {
    return {
      slug: path.slice(path.indexOf(BASE_PATH)).replace(".mdx", ""),
    };
  });
};

export const getAllCategoryPath = (mainCategroy: "knowledge" | "body" | "moral") => {
  const postPaths: string[] = sync(`${POSTS_PATH}/${mainCategroy}/**/*.mdx`);
  return postPaths.map((path) => {
    return {
      slug: path.slice(path.indexOf(BASE_PATH)).replace(".mdx", ""),
    };
  });
};

export const getCategoryList = (mainCategory: "knowledge" | "body" | "moral") => {
  const mainCategoryPaths: string[] = sync(`${POSTS_PATH}/${mainCategory}/*`);
  const categoryLists = mainCategoryPaths.map((path) => path.split("/").slice(-1)?.[0]);
  return categoryLists;
};

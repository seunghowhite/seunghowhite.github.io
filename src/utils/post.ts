import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "/src/_posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export type Subject = "knowledge" | "body" | "moral";
type Paths = string[];

// !주어진 경로에서 지정한 depth의 디렉토리 이름을 추출하는 함수
const extractDirectoryAtDepth = (path: string, depthFromEnd: number) => path.split("/").slice(-depthFromEnd)[0];
// !모든 MDX 파일 조회
export const getPostPaths = (subject?: Subject) => {
  const folder = subject || "**";
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return postPaths;
};

// !주어진 경로 목록에서 고유한 카테고리 목록을 추출하는 함수
export const getCategories = (paths: Paths) => {
  return Array.from(new Set(paths.map((path) => extractDirectoryAtDepth(path, 3))));
};

// !주어진 주제의 상위 카테고리 목록을 가져오는 함수
export const getCategoryList = (subject: Subject) => {
  const postPaths = getPostPaths(subject);
  const categories = getCategories(postPaths);
  return categories;
};

// !주어진 category와 post를 가져오는 함수
export const getCategoryPostList = (subject: Subject) => {
  const categoryPaths = getPostPaths(subject);
  const categoryAndPostList = categoryPaths.map((path) => {
    const category = extractDirectoryAtDepth(path, 3); // category
    const post = extractDirectoryAtDepth(path, 2); // post
    return [category, post];
  });
  return categoryAndPostList;
};
// !전체 개수와 각 카테고리별 개수를 계산하는 함수
export const getCategoryCounts = (subject: Subject) => {
  const categoryPostList = getCategoryPostList(subject);
  const categoryCounts = categoryPostList.reduce<{ [key: string]: number }>((acc, [category]) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const allCount = categoryPostList.length;
  return { all: allCount, ...categoryCounts } as {
    [key: string]: number;
  };
};
//reat, nextjs 같은 서브 카테고리시 보여줄 리스트
export const getSubCategoryPosts = (mainCategory: Subject, subCategory?: string) => {
  // subCategory가 제공되지 않으면 mainCategory 하위의 모든 *.mdx 파일을 불러옵니다.
  const globPath = subCategory
    ? `${POSTS_PATH}/${mainCategory}/${subCategory}/**/*.mdx`
    : `${POSTS_PATH}/${mainCategory}/**/*.mdx`;

  const postPaths: string[] = sync(globPath);

  return postPaths.map((postPath) => {
    const fileContent = fs.readFileSync(postPath, "utf8");
    const { data, content } = matter(fileContent);

    const readingMinutes = Math.ceil(readingTime(content).minutes); // 읽기 시간 계산
    const dateString = data.date ? new Date(data.date).toISOString().split("T")[0] : ""; // 날짜 형식 변환

    // `postPath`에서 `mainCategory`와 `subCategory`를 기준으로 슬러그와 URL 생성
    const pathParts = postPath.split(path.sep);
    const subCategoryFromPath = pathParts[pathParts.indexOf(mainCategory) + 1]; // 하위 카테고리 추출
    const slug = pathParts[pathParts.indexOf(subCategoryFromPath) + 1]; // 슬러그 추출

    // URL 생성: "/[mainCategory]/[subCategory]/[slug]"
    const url = `/${mainCategory}/${subCategoryFromPath}/${slug}`;

    return {
      category: subCategoryFromPath, // 추출된 하위 카테고리
      thumbnail: data.thumbnail, // 섬네일 링크
      title: data.title, // 제목
      readingMinutes, // 읽기 시간 (분)
      date: dateString, // 날짜 (ISO 형식)
      url, // URL
      slug, // 슬러그
    };
  });
};

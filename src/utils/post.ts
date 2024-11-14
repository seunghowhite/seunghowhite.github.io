import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "/src/_posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

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

//!

export const getCategoryList = (mainCategory: "knowledge" | "body" | "moral") => {
  const mainCategoryPaths: string[] = sync(`${POSTS_PATH}/${mainCategory}/**/*.mdx`);

  const categoryLists = mainCategoryPaths.map((path) => path.split("/").slice(-3)?.[0]);
  return categoryLists;
};
export const getDetailList = (mainCategory: "knowledge" | "body" | "moral") => {
  const mainCategoryPaths: string[] = sync(`${POSTS_PATH}/${mainCategory}/**/*.mdx`);

  // console.log("mainCategoryPath312312s: ", mainCategoryPaths[0].split("/").slice(-1));
  const categoryLists = mainCategoryPaths.map((path) => path.split("/").slice(-3, -1));

  return categoryLists;
};
//reat, nextjs 같은 서브 카테고리시 보여줄 리스트
export const getSubCategoryPosts = (mainCategory: "knowledge" | "body" | "moral", subCategory?: string) => {
  // subCategory가 제공되지 않으면 mainCategory 하위의 모든 *.mdx 파일을 불러옵니다.
  const globPath = subCategory
    ? `${POSTS_PATH}/${mainCategory}/${subCategory}/**/*.mdx`
    : `${POSTS_PATH}/${mainCategory}/**/*.mdx`;

  const postPaths: string[] = sync(globPath);
  console.log("postPaths: ", postPaths);

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

// export interface PostMatter {
//   title: string;
//   date: Date;
//   dateString: string;
//   thumbnail: string;
//   desc: string;
// }

// export interface Post extends PostMatter {
//   url: string;
//   slug: string;
//   categoryPath: string;
//   content: string;
//   readingMinutes: number;
//   categoryPublicName: string;
// }
// // post를 날짜 최신순으로 정렬
// const sortPostList = (PostList: Post[]) => {
//   return PostList.sort((a, b) => (a.date > b.date ? -1 : 1));
// };

// // 모든 MDX 파일 조회
// export const getPostPaths = (category?: string) => {
//   const folder = category || "**";
//   const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
//   return postPaths;
// };
// // category folder name을 public name으로 변경 : dir_name -> Dir Name
// export const getCategoryPublicName = (dirPath: string) =>
//   dirPath
//     .split("_")
//     .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
//     .join(" ");
// // MDX 파일 파싱 : abstract / detail 구분
// // MDX의 개요 파싱
// // url, cg path, cg name, slug
// export const parsePostAbstract = (postPath: string) => {
//   const filePath = postPath.slice(postPath.indexOf(BASE_PATH)).replace(`${BASE_PATH}/`, "").replace(".mdx", "");

//   const [categoryPath, slug] = filePath.split("/");
//   const url = `/blog/${categoryPath}/${slug}`;
//   const categoryPublicName = getCategoryPublicName(categoryPath);
//   return { url, categoryPath, categoryPublicName, slug };
// };
// // MDX detail
// const parsePostDetail = async (postPath: string) => {
//   const file = fs.readFileSync(postPath, "utf8");
//   const { data, content } = matter(file);
//   const grayMatter = data as PostMatter;
//   const readingMinutes = Math.ceil(readingTime(content).minutes);
//   // const dateString = dayjs(grayMatter.date).locale("ko").format("YYYY년 MM월 DD일");
//   // const dateString = dayjs(grayMatter.date).locale("ko").format("YYYY년 MM월 DD일");
//   const dateString = "YYYY년 MM월 DD일";
//   return { ...grayMatter, dateString, content, readingMinutes };
// };

// const parsePost = async (postPath: string): Promise<Post> => {
//   const postAbstract = parsePostAbstract(postPath);
//   const postDetail = await parsePostDetail(postPath);
//   return {
//     ...postAbstract,
//     ...postDetail,
//   };
// };

// // 모든 포스트 목록 조회. 블로그 메인 페이지에서 사용
// export const getPostList = async (category?: string): Promise<Post[]> => {
//   const postPaths = getPostPaths(category);
//   const postList = await Promise.all(postPaths.map((postPath) => parsePost(postPath)));
//   return postList;
// };
// export const getSortedPostList = async (category?: string) => {
//   const postList = await getPostList(category);
//   return sortPostList(postList);
// };

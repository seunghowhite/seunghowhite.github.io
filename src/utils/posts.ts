import titleCase from "@/utils/titleCase";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "/src/_posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

const extractDirectoryAtDepth = (path: string, depthFromEnd: number) => path.split("/").slice(-depthFromEnd)[0];

export const getPostPaths = (subject?: string) => {
  const folder = subject || "**";
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/**/*.mdx`);
  return postPaths;
};

export const getStaticParams = (type: "subject" | "category" | "post") => {
  const filePaths = getPostPaths();

  // filePaths에서 필요한 데이터 추출
  const staticParams = filePaths.map((path) => {
    const [subject, category, post] = path.split("/").slice(-4, -1);
    if (type === "subject") {
      return { subject };
    } else if (type === "category") {
      return { subject, category };
    } else if (type === "post") {
      return { subject, category, post };
    }
  });
  return staticParams;
};
// 주어진 category와 post를 가져오는 함수
export const getCategoryPostList = (subject: string) => {
  const categoryPaths = getPostPaths(subject);
  const categoryAndPostList = categoryPaths.map((path) => {
    const category = extractDirectoryAtDepth(path, 3); // category
    const post = extractDirectoryAtDepth(path, 2); // post
    return [category, post];
  });
  return categoryAndPostList;
};
//카태고리 header용
export const getCategoryCounts = (subject: string) => {
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

const parsePostData = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const readingMinutes = Math.ceil(readingTime(content).minutes); // 읽기 시간 계산
  const date = data.date ? new Date(data.date).toISOString().split("T")[0] : ""; // 날짜 형식 변환
  const title = data.title as string;
  const thumbnail = data.thumbnail as string;
  const description = data.description as string;
  const keywords = data.keywords as string[];
  return {
    thumbnail, // 섬네일 링크
    title, // 제목
    description, // 부제목
    readingMinutes, // 읽기 시간 (분)
    date, // 날짜 (ISO 형식)
    content, // 본문 (필요시 포함)
    keywords,
    metadata: data, // 추가 메타데이터
  };
};

// getPostDetailData 함수
export const getPostDetailData = ({ subject, category, post }: { subject: string; category: string; post: string }) => {
  const globPath = category
    ? `${POSTS_PATH}/${subject}/${category}/${post}/*.mdx`
    : `${POSTS_PATH}/${subject}/**/**/*.mdx`;
  const postPaths: string[] = sync(globPath);
  if (!postPaths.length) throw new Error("Post not found");

  const { thumbnail, title, description, readingMinutes, date, content, keywords } = parsePostData(postPaths[0]); // 첫 번째 파일 데이터 추출

  return {
    thumbnail,
    title,
    description,
    readingMinutes,
    date,
    content,
    keywords,
  };
};

// getPostList 함수
export const getPostList = (subject: string, category?: string) => {
  const globPath = category ? `${POSTS_PATH}/${subject}/${category}/**/*.mdx` : `${POSTS_PATH}/${subject}/**/**/*.mdx`;
  const postPaths: string[] = sync(globPath);

  return postPaths
    .map((postPath) => {
      const pathParts = postPath.split(path.sep);
      const categoryPath = pathParts[pathParts.indexOf(subject) + 1]; // 하위 카테고리 추출
      const post = pathParts[pathParts.indexOf(categoryPath) + 1]; // 슬러그 추출
      const url = `/${subject}/${categoryPath}/${post}`; // URL 생성

      const { thumbnail, title, description, readingMinutes, date } = parsePostData(postPath); // 유틸리티 함수 재사용

      return {
        category: titleCase(categoryPath), // 추출된 하위 카테고리
        thumbnail,
        title,
        description,
        readingMinutes,
        date,
        url,
        post,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
};

export const parseToc = (content: string) => {
  const regex = /^(##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading: string) => ({
      text: heading.replace("##", "").replace("#", ""),
      link:
        "#" +
        heading
          .replace("# ", "")
          .replace("#", "")
          // eslint-disable-next-line no-useless-escape
          .replace(/[\[\]:!@#$/%^&*()+=,.]/g, "")
          .replace(/ /g, "-")
          .toLowerCase()
          .replace("?", ""),
      indent: (heading.match(/#/g)?.length || 2) - 2,
    })) || []
  );
};
//?
// export const getSitemapPostList = async () => {
//   const postList = await getPostList();
//   const baseUrl = "";
//   const sitemapPostList = postList.map(({ url }) => ({
//     lastModified: new Date(),
//     url: `${baseUrl}${url}`,
//   }));
//   return sitemapPostList;
// };

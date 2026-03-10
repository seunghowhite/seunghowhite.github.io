import titleCase from "@/utils/titleCase";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "/src/_posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

/** _로 시작하는 폴더(subject/category/post)는 임시 비공개 처리 */
const isHiddenPath = (normalizedPath: string) => {
  const parts = normalizedPath.split("/");
  const postsIndex = parts.findIndex((p) => p === "_posts");
  if (postsIndex === -1) return true;
  const [subject, category, post] = parts.slice(postsIndex + 1, postsIndex + 4);
  return [subject, category, post].some((part) => part?.startsWith("_"));
};

const extractDirectoryAtDepth = (path: string, depthFromEnd: number) => path.split("/").slice(-depthFromEnd)[0];

export const getPostPaths = (subject?: string) => {
  const folder = subject || "**";
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/**/*.mdx`);
  return postPaths.map((p) => p.replace(/\\/g, "/")).filter((p) => !isHiddenPath(p));
};

export const getStaticParams = (type: "subject" | "category" | "post") => {
  const filePaths = getPostPaths();

  // filePaths에서 필요한 데이터 추출
  const staticParams = filePaths
    .map((filePath) => {
      const pathParts = filePath.split("/");
      const postsIndex = pathParts.findIndex((part) => part === "_posts");

      if (postsIndex === -1) return null;

      const subject = pathParts[postsIndex + 1];
      const category = pathParts[postsIndex + 2];
      const post = pathParts[postsIndex + 3];

      // 유효성 검사
      if (!subject) return null;

      if (type === "subject") {
        return { subject };
      } else if (type === "category") {
        if (!category) return null;
        return { subject, category };
      } else if (type === "post") {
        if (!category || !post) return null;
        return { subject, category, post };
      }
      return null;
    })
    .filter(Boolean); // null 값 제거

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

const parsePostData = (filePath: string, subject?: string, category?: string, post?: string) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const readingMinutes = Math.ceil(readingTime(content).minutes); // 읽기 시간 계산
  const date = data.date ? new Date(data.date).toISOString().split("T")[0] : ""; // 날짜 형식 변환
  const title = data.title as string;
  let thumbnail = data.thumbnail as string;

  // thumbnail이 /posts/로 시작하지 않고 subject/category/post가 모두 있으면 경로 자동 생성
  if (thumbnail && !thumbnail.startsWith("/posts/") && subject && category && post) {
    thumbnail = `/posts/${subject}/${category}/${post}/${thumbnail}`;
  }

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

// getPostList 함수
export const getPostDetailData = ({ subject, category, post }: { subject: string; category: string; post: string }) => {
  if ([subject, category, post].some((p) => p.startsWith("_"))) {
    throw new Error("Post not found");
  }
  // glob 패턴에서 슬래시 사용 (Windows 경로 구분자를 슬래시로 정규화)
  const normalizedPostsPath = POSTS_PATH.replace(/\\/g, "/");
  const globPath = category
    ? `${normalizedPostsPath}/${subject}/${category}/${post}/*.mdx`
    : `${normalizedPostsPath}/${subject}/**/**/*.mdx`;
  const postPaths: string[] = sync(globPath);
  if (!postPaths.length) throw new Error("Post not found");

  const { thumbnail, title, description, readingMinutes, date, content, keywords } = parsePostData(
    postPaths[0],
    subject,
    category,
    post
  ); // 첫 번째 파일 데이터 추출

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

export const getPostList = async (subject?: string, category?: string) => {
  // globPath 수정된 부분
  const globPath = !subject
    ? `${POSTS_PATH}/**/**/**/*.mdx`
    : category
      ? `${POSTS_PATH}/${subject}/${category}/**/*.mdx`
      : `${POSTS_PATH}/${subject}/**/**/*.mdx`;

  const postPaths = sync(globPath)
    .map((p) => p.replace(/\\/g, "/"))
    .filter((p) => !isHiddenPath(p));

  // postPaths를 순회하며 포스트 데이터 추출
  return postPaths
    .map((postPath) => {
      // Windows 경로 구분자를 Unix 스타일로 변환
      const normalizedPath = postPath.replace(/\\/g, "/");
      const pathParts = normalizedPath.split("/");

      // _posts 인덱스 찾기
      const postsIndex = pathParts.findIndex((part) => part === "_posts");

      if (postsIndex === -1) {
        // _posts를 찾을 수 없는 경우 빈 객체 반환 (나중에 필터링)
        return null;
      }

      // subjectPath 추출 (subject가 없을 경우 자동 추출)
      const subjectPath = subject || pathParts[postsIndex + 1]; //서브젝트 추출
      const categoryPath = pathParts[postsIndex + 2] || ""; //카테고리 추출
      const post = pathParts[postsIndex + 3] || ""; //포스트 추출

      // 유효성 검사
      if (!subjectPath || !categoryPath || !post) {
        return null;
      }

      // URL 생성
      const url = `/${subjectPath}/${categoryPath}/${post}`;

      // 포스트 데이터를 파싱
      const { thumbnail, title, description, readingMinutes, date } = parsePostData(
        postPath,
        subjectPath,
        categoryPath,
        post
      );

      return {
        subject: subjectPath,
        category: titleCase(categoryPath),
        thumbnail,
        title,
        description,
        readingMinutes,
        date,
        url,
        post,
      };
    })
    .filter((item) => item !== null) // null 값 제거
    .sort((a, b) => (a!.date > b!.date ? -1 : 1)) as Array<{
    subject: string;
    category: string;
    thumbnail: string;
    title: string;
    description: string;
    readingMinutes: number;
    date: string;
    url: string;
    post: string;
  }>;
};

export const parseToc = (content: string) => {
  // Toggle 태그의 위치를 찾아서 범위 저장
  const toggleRanges: Array<{ start: number; end: number }> = [];
  const toggleRegex = /<Toggle[^>]*>/gi;
  let toggleMatch;

  while ((toggleMatch = toggleRegex.exec(content)) !== null) {
    const startPos = toggleMatch.index;
    // Toggle 태그의 닫는 태그 찾기
    let depth = 1;
    let pos = toggleMatch.index + toggleMatch[0].length;

    while (depth > 0 && pos < content.length) {
      const openToggle = content.indexOf("<Toggle", pos);
      const closeToggle = content.indexOf("</Toggle>", pos);

      if (closeToggle === -1) break;

      if (openToggle !== -1 && openToggle < closeToggle) {
        depth++;
        pos = openToggle + 7;
      } else {
        depth--;
        if (depth === 0) {
          toggleRanges.push({ start: startPos, end: closeToggle + 9 });
          break;
        }
        pos = closeToggle + 9;
      }
    }
  }

  // heading 찾기
  const regex = /^(##|###) (.*$)/gim;
  const headingList: Array<{ text: string; position: number }> = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const heading = match[0];
    const position = match.index;

    // 이 heading이 Toggle 내부에 있는지 확인
    const isInsideToggle = toggleRanges.some((range) => position >= range.start && position <= range.end);

    if (!isInsideToggle) {
      headingList.push({ text: heading, position });
    }
  }

  const linkCounts: { [key: string]: number } = {};

  return headingList.map(({ text: heading }) => {
    // 전체 제목에서 ## 또는 ### 제거
    let cleanText = heading.replace(/^##\s*/, "").replace(/^###\s*/, "");

    // div 태그가 있으면 안의 텍스트만 추출 (더 강력한 정규식)
    const textMatch = cleanText.match(/<div[^>]*className="[^"]*"[^>]*>(.*?)<\/div>/);
    if (textMatch) {
      cleanText = textMatch[1];
    } else {
      // className이 없는 div 태그도 처리
      const simpleTextMatch = cleanText.match(/<div[^>]*>(.*?)<\/div>/);
      if (simpleTextMatch) {
        cleanText = simpleTextMatch[1];
      }
    }

    // text 필드에서도 # 기호 제거
    cleanText = cleanText.replace(/#/g, "").trim();

    // link 생성
    let baseLink = cleanText
      .replace("# ", "")
      .replace("#", "")
      .replace(/[\[\]:!@#$/%^&*()+=,.]/g, "")
      .replace(/ /g, "-")
      .toLowerCase()
      .replace("?", "");

    // 중복된 link 처리
    if (linkCounts[baseLink]) {
      linkCounts[baseLink]++;
      baseLink = `${baseLink}-${linkCounts[baseLink]}`;
    } else {
      linkCounts[baseLink] = 1;
    }

    return {
      text: cleanText,
      link: `#${baseLink}`,
      indent: (heading.match(/#/g)?.length || 2) - 2,
    };
  });
};

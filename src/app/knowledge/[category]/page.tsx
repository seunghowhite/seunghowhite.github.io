// /knowledge/[subtitle]/page.tsx 파일
import Link from "next/link";

import { getSortedPostList } from "@/lib/post";
import { getCategoryList, getSubCategoryPosts } from "@/utils/post";

// 허용된 param 외 접근시 404
// export const dynamic = "force-static";
// export const dynamicParams = false;

// 모든 필요한 subtitle 값을 포함하도록 수정
export async function generateStaticParams() {
  const categoryList = await getCategoryList("knowledge");
  const categorys = categoryList.map((category) => ({ category }));
  return categorys;
}

// 페이지 컴포넌트
export default async function KnowledgeCategoryPage({ params }: { params: { category: string } }) {
  console.log("params: ", params);
  // const postList = await getSortedPostList(params.category);
  const posts = await getSubCategoryPosts("knowledge", params.category);

  return (
    <div>
      <h1>Knowledge Category Page: {params.category}</h1>
      <div className="flex flex-col gap-4">
        {posts.map((item) => (
          <Link
            href={item.url}
            key={item.category}
            className="bg-blue-300"
          >
            {/* 카테고리 이름 */}
            <div className="post-category">category{item.category}</div>

            {/* 게시 날짜 */}
            <div className="post-date">date{item.date}</div>

            {/* 제목 */}
            <h2 className="post-title">title{item.title}</h2>

            {/* 섬네일 이미지 */}
            <div>thumbnail{item.thumbnail}</div>
            <div>url{item.url}</div>
            {/* 읽기 시간 */}
            <div className="post-reading-time">{item.readingMinutes}분 읽기</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

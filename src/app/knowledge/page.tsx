import Link from "next/link";

import { getAllPosts, getCategoryList, getSubCategoryPosts } from "@/utils/post";

export default async function KnowlegePage() {
  const categoryList = await getCategoryList("knowledge");
  const posts = await getSubCategoryPosts("knowledge");
  return (
    <div>
      <div>KnowlegePage all page</div>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={`/knowledge/${category}`}
            key={index}
          >
            <div>{category}</div>
          </Link>
        ))}
      </div>

      <div className="mt-20 flex flex-col gap-4">
        {posts.map((item) => (
          <div
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
          </div>
        ))}
      </div>
    </div>
  );
}

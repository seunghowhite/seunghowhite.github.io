// /knowledge/[subtitle]/page.tsx 파일
import Link from "next/link";

import CategoryList from "@/components/category/CategoryList";
import { getSortedPostList } from "@/lib/post";
import { getCategoryCounts, getCategoryList, getCategoryPostList, getSubCategoryPosts } from "@/utils/post";

// todo subject를 기준으로 모든 subject에 관련된 category를 가지고 와야함. 경우의수를 다 보는거지.
interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const categoryList = await getCategoryList("moral");
  const categorys = categoryList.map((category) => ({ category }));
  return categorys;
}

// 페이지 컴포넌트
export default async function KnowledgeCategoryPage({ params: { category } }: Props) {
  const subject = "moral";
  const categoryCountList = getCategoryCounts(subject);
  const posts = getSubCategoryPosts(subject, category);

  return (
    <div>
      <CategoryList
        list={categoryCountList}
        subject={subject}
        targetCategory={category}
      />
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

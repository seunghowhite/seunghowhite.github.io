// /knowledge/[subtitle]/page.tsx 파일
import Link from "next/link";

import CategoryList from "@/components/category/CategoryList";
import PostList from "@/components/post_list/PostList";
import { getSortedPostList } from "@/lib/post";
import { getCategoryCounts, getCategoryList, getCategoryPostList, getSubCategoryPosts } from "@/utils/post";

// todo subject를 기준으로 모든 subject에 관련된 category를 가지고 와야함. 경우의수를 다 보는거지.
interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const categoryList = await getCategoryList("body");
  const categorys = categoryList.map((category) => ({ category }));
  return categorys;
}

// 페이지 컴포넌트
export default async function KnowledgeCategoryPage({ params: { category } }: Props) {
  const subject = "body";
  const categoryCountList = getCategoryCounts(subject);
  const postList = getSubCategoryPosts(subject, category);

  return (
    <div>
      <CategoryList
        list={categoryCountList}
        subject={subject}
        targetCategory={category}
      />
      <PostList postList={postList} />
    </div>
  );
}

// /knowledge/[subtitle]/page.tsx 파일
import { Metadata } from "next";
import Link from "next/link";

import CategoryList from "@/components/category/CategoryList";
import PostList from "@/components/post_list/PostList";
import { getMetadata } from "@/utils/metadata";
import { getCategoryCounts, getCategoryList, getCategoryPostList, getSubCategoryPosts } from "@/utils/post";

// todo subject를 기준으로 모든 subject에 관련된 category를 가지고 와야함. 경우의수를 다 보는거지.
interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const categoryList = await getCategoryList("knowledge");
  const categorys = categoryList.map((category) => ({ category }));
  return categorys;
}
export async function generateMetadata({ params: { category } }: Props): Promise<Metadata> {
  return getMetadata({ asPath: `/knowledge/${category}` });
}

// 페이지 컴포넌트
export default async function KnowledgeCategoryPage({ params: { category } }: Props) {
  const subject = "knowledge";
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

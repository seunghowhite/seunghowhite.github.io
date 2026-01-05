// /knowledge/[subtitle]/page.tsx 파일
import { Metadata } from "next";

import CategoryList from "@/components/post_list/CategoryList";
import PostList from "@/components/post_list/PostList";
import { getMetadata } from "@/utils/metadata";
import { getCategoryCounts, getPostList, getStaticParams } from "@/utils/posts";

interface ParamType {
  params: Promise<{ subject: string; category: string }>;
}

interface CategoryParams {
  subject: string;
  category: string;
}

export async function generateStaticParams(): Promise<CategoryParams[]> {
  return getStaticParams("category") as CategoryParams[];
}

export async function generateMetadata({ params }: ParamType): Promise<Metadata> {
  const { subject, category } = await params;
  return getMetadata({
    asPath: `/${subject}/${category}`,
    keywords: [`${subject}`],
    title: subject,
  });
}
// 페이지 컴포넌트
export default async function CategoryPage({ params }: ParamType) {
  const { subject, category } = await params;
  const categoryCountList = getCategoryCounts(subject);
  const postList = await getPostList(subject, category);

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

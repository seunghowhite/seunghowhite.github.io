// /knowledge/[subtitle]/page.tsx 파일
import { Metadata } from "next";

import CategoryList from "@/components/category/CategoryList";
import PostList from "@/components/post_list/PostList";
import { getMetadata } from "@/utils/metadata";
import { getCategoryCounts, getPostList, getStaticParams } from "@/utils/posts";

interface ParamType {
  params: { subject: string; category: string };
}

export async function generateStaticParams() {
  return getStaticParams("category");
}

export async function generateMetadata({ params: { subject, category } }: ParamType): Promise<Metadata> {
  return getMetadata({
    asPath: `/${subject}/${category}`,
    keywords: [`${subject}`],
    title: subject,
  });
}
// 페이지 컴포넌트
export default async function CategoryPage({ params: { subject, category } }: ParamType) {
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

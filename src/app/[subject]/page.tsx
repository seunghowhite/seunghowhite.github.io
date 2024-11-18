import { Metadata } from "next";

import CategoryList from "@/components/category/CategoryList";
import PostList from "@/components/post_list/PostList";
import { getMetadata } from "@/utils/metadata";
import { getCategoryCounts, getPostList, getStaticParams } from "@/utils/posts";

interface ParamType {
  params: {
    subject: string;
  };
}

export async function generateStaticParams() {
  return getStaticParams("subject");
}
//todo subject,categroy의 모든 keywords를 다넣자
export async function generateMetadata({ params: { subject } }: ParamType): Promise<Metadata> {
  return getMetadata({
    asPath: `/${subject}`,
    keywords: [`${subject}`],
    title: subject,
  });
}

export default async function SubjectPage({ params: { subject } }: ParamType) {
  const categoryCountList = getCategoryCounts(subject);
  const postList = getPostList(subject);
  return (
    <div>
      <CategoryList
        list={categoryCountList}
        subject={subject}
        targetCategory={null}
      />
      <PostList postList={postList} />
    </div>
  );
}

import { Metadata } from "next";

import CategoryList from "@/components/post_list/CategoryList";
import PostList from "@/components/post_list/PostList";
import { getMetadata } from "@/utils/metadata";
import { getCategoryCounts, getPostList, getStaticParams } from "@/utils/posts";

interface ParamType {
  params: Promise<{
    subject: string;
  }>;
}

interface SubjectParams {
  subject: string;
}

export async function generateStaticParams(): Promise<SubjectParams[]> {
  return getStaticParams("subject") as SubjectParams[];
}

export async function generateMetadata({ params }: ParamType): Promise<Metadata> {
  const { subject } = await params;
  return getMetadata({
    asPath: `/${subject}`,
    keywords: [`${subject}`],
    title: subject,
  });
}

export default async function SubjectPage({ params }: ParamType) {
  const { subject } = await params;
  const categoryCountList = getCategoryCounts(subject);
  const postList = await getPostList(subject);

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

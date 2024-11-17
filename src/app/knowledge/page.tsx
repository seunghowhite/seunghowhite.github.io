import { Metadata } from "next";

import CategoryList from "@/components/category/CategoryList";
import PostList from "@/components/post_list/PostList";
import { getMetadata } from "@/utils/metadata";
import { getCategoryCounts, getSubCategoryPosts } from "@/utils/post";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    asPath: `/knowledge`,
    keywords: ["knowledge", "지식", "개발"],
    ogImage: `/posts/knowledge/test.png`,
  });
}

export default async function KnowlegePage() {
  const subject = "knowledge";
  const categoryCountList = getCategoryCounts(subject);
  const postList = getSubCategoryPosts(subject);
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

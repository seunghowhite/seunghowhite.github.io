import Link from "next/link";

import CategoryList from "@/components/category/CategoryList";
import PostList from "@/components/post_list/PostList";
import { getCategoryCounts, getCategoryList, getSubCategoryPosts } from "@/utils/post";

export default async function KnowlegePage() {
  const subject = "moral";
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

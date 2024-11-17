// /knowledge/[subtitle]/page.tsx 파일
import { PostBody } from "@/components/post_detail/PostBody";
import PostHeader from "@/components/post_detail/PostHeader";
import TocSidebar from "@/components/post_detail/TableOfContentSidebar";
import TableOfContentTop from "@/components/post_detail/TableOfContentTop";
import { getPostDetail } from "@/lib/post";
import { getCategoryList, getCategoryPostList, getSubCategoryPosts, parseToc } from "@/utils/post";

// 허용된 param 외 접근시 404
// export const dynamic = "force-static";
// export const dynamicParams = false;

interface Props {
  params: { category: string; post: string };
}

// 모든 필요한 subtitle 값을 포함하도록 수정
export async function generateStaticParams() {
  const categoryPostList = await getCategoryPostList("knowledge");
  const categorys = categoryPostList.map((item) => ({ category: item[0], post: item[1] }));
  return categorys;
}

// 페이지 컴포넌트
export default async function PostPage({ params: { category, post } }: Props) {
  console.log("category: ", category);
  console.log("post: ", post);
  // const postList = await getSortedPostList(params.category);
  const postData = await getPostDetail("knowledge", category, post);
  const toc = parseToc(postData.content);
  // const posts = await getSubCategoryPosts("category",category);

  return (
    <section className="prose mx-auto w-full max-w-[47rem] px-5 dark:prose-invert sm:px-6">
      <PostHeader post={{ category, subject: "knowledge" }} />
      <TableOfContentTop toc={toc} />
      <article className="relative">
        <TocSidebar toc={toc} />
        <PostBody content={postData.content} />
      </article>
      <hr />

      {/* <FloatingButton /> */}
    </section>
  );
}

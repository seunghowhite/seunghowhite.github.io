// /knowledge/[subtitle]/page.tsx 파일
import { getSortedPostList } from "@/lib/post";
import { getCategoryList, getCategoryPostList, getSubCategoryPosts } from "@/utils/post";

// 허용된 param 외 접근시 404
// export const dynamic = "force-static";
// export const dynamicParams = false;

interface Props {
  params: { category: string; post: string };
}

// 모든 필요한 subtitle 값을 포함하도록 수정
export async function generateStaticParams() {
  const categoryPostList = await getCategoryPostList("moral");
  const categorys = categoryPostList.map((item) => ({ category: item[0], post: item[1] }));
  return categorys;
}

// 페이지 컴포넌트
export default async function PostPage({ params: { category, post } }: Props) {
  console.log("category: ", category);
  console.log("post: ", post);
  // const postList = await getSortedPostList(params.category);
  // const posts = await getSubCategoryPosts("category",category);

  return (
    <div>
      <h2>detail</h2>
      <h1>category : {category}</h1>
      <h1>post : {post}</h1>
    </div>
  );
}

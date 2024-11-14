// /knowledge/[subtitle]/page.tsx 파일
import { getCategoryList } from "@/utils/post";

// 허용된 param 외 접근시 404
// export const dynamic = "force-static";
// export const dynamicParams = false;

// 모든 필요한 subtitle 값을 포함하도록 수정
export async function generateStaticParams() {
  const categoryList = await getCategoryList("knowledge");
  const categorys = categoryList.map((category) => ({ category }));
  return categorys;
}

// 페이지 컴포넌트
export default function KnoewledgeCategoryPage({ params }: { params: { category: string } }) {
  return <div>KnoewledgeCategoryPage: {params.category}</div>;
}

import { getAllPosts, getCategoryList } from "@/utils/post";

export default async function KnowlegePage() {
  const categoryList = await getCategoryList("knowledge");
  return (
    <div>
      <div>KnowlegePage all page</div>
      <div>
        {categoryList.map((category, index) => (
          <div key={index}>{category}</div>
        ))}
      </div>
    </div>
  );
}

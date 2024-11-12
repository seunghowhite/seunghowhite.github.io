import { getAllPostCount, getCategoryDetailList, getSortedPostList } from "@/lib/post";

interface PostListProps {
  category?: string;
}

const Blog = async ({ category }: PostListProps) => {
  const postList = await getSortedPostList(category);
  //!postList예시
  //postList:
  //* [
  //*   {
  //*     url: '/blog/category_2/title_2',
  //*     categoryPath: 'categroy_2',
  //*     categoryPublicName: 'Categroy 2',
  //*     slug: 'title_2',
  //*     title: 'title 테스트1',
  //*     date: 2024-11-01T00:00:00.000Z,
  //*     desc: 'desc 테스트1',
  //*     thumbnail: '/posts/nextjs_blog/setup/thumbnail.jpg',
  //*     dateString: 'YYYY년 MM월 DD일',
  //*     content: ' \n#### 환영 1\n \n안녕하세요. 이 글은 mdx파일로 작성되었습니다. 1',
  //*     readingMinutes: 1
  //*   },
  //*   {
  //*     url: '/blog/categroy_1/title_1',
  //*     categoryPath: 'categroy_1',
  //*     categoryPublicName: 'Categroy 1',
  //*     slug: 'title_1',
  //*     title: 'title 테스트1',
  //*     date: 2024-11-01T00:00:00.000Z,
  //*     desc: 'desc 테스트1',
  //*     thumbnail: '/posts/nextjs_blog/setup/thumbnail.jpg',
  //*     dateString: 'YYYY년 MM월 DD일',
  //*     content: ' \n#### 환영 1\n \n안녕하세요. 이 글은 mdx파일로 작성되었습니다. 1',
  //*     readingMinutes: 1
  //*   }
  //* ]

  const categoryList = await getCategoryDetailList();
  //!categoryList예시
  //* categoryList: [
  //*   { dirName: "categroy_2", publicName: "Categroy 2", count: 1 },
  //*   { dirName: "categroy_1", publicName: "Categroy 1", count: 1 },
  //* ];

  const allPostCount = await getAllPostCount();
  //!allPostCount예시
  //*allPostCount:  2

  return (
    <section className="mx-auto mt-12 h-[2000px] w-full max-w-[950px] px-4">
      <div>
        <p className="mb-4 h-72 bg-blue-950">text</p>
        <p className="mb-4 h-72 bg-blue-950">text</p>
        <p className="mb-4 h-72 bg-blue-950">text</p>
        <p className="mb-4 h-72 bg-blue-950">text</p>
        <p className="mb-4 h-72 bg-blue-950">text</p>
        <p className="mb-4 h-72 bg-blue-950">text</p>
        <p className="mb-4 h-72 bg-blue-950">text</p>
      </div>
    </section>
  );
};

export default Blog;

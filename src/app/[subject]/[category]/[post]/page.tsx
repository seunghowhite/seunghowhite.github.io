// /knowledge/[subtitle]/page.tsx 파일
import { Metadata } from "next";

import FloatingButton from "@/components/post_detail/FloatingButton";
import Giscus from "@/components/post_detail/Giscus";
import { PostBody } from "@/components/post_detail/PostBody";
import PostFooter from "@/components/post_detail/PostFooter";
import PostHeader from "@/components/post_detail/PostHeader";
import TocSidebar from "@/components/post_detail/TableOfContentSidebar";
import TableOfContentTop from "@/components/post_detail/TableOfContentTop";
import { getMetadata } from "@/utils/metadata";
import { getPostDetailData, getPostList, getStaticParams, parseToc } from "@/utils/posts";

export interface params {
  subject: string;
  category: string;
  post: string;
}

interface ParamType {
  params: Promise<params>;
}

export async function generateStaticParams(): Promise<params[]> {
  return getStaticParams("post") as params[];
}

export async function generateMetadata({ params }: ParamType): Promise<Metadata> {
  const { subject, category, post } = await params;
  const { title, description, keywords, thumbnail } = getPostDetailData({ subject, category, post });
  return getMetadata({
    title,
    description,
    asPath: `/${subject}/${category}/${post}`,
    keywords,
    ogImage: thumbnail,
  });
}

export default async function PostPage({ params }: ParamType) {
  const { subject, category, post } = await params;
  const { content, title, date, readingMinutes } = getPostDetailData({ subject, category, post });
  const toc = parseToc(content);
  const postList = await getPostList(subject);

  return (
    <section className="prose mx-auto w-full max-w-[47rem] px-5 dark:prose-invert sm:px-6">
      <PostHeader
        title={title}
        subject={subject}
        category={category}
        date={date}
        readingMinutes={readingMinutes}
      />
      <TableOfContentTop
        toc={toc}
        subject={subject}
      />
      <article className="relative">
        <TocSidebar
          toc={toc}
          subject={subject}
        />
        <PostBody
          content={content}
          subject={subject}
          category={category}
          post={post}
        />
      </article>
      <hr />
      <Giscus />
      <PostFooter
        subject={subject}
        currentPostUrl={`/${subject}/${category}/${post}`}
        postList={postList.map((p) => ({
          post: p.post,
          title: p.title,
          url: p.url,
          date: p.date,
          category: p.category,
        }))}
      />
      <FloatingButton />
    </section>
  );
}

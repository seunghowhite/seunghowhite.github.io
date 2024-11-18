// /knowledge/[subtitle]/page.tsx 파일
import { Metadata } from "next";

import FloatingButton from "@/components/etc/FloatingButton";
import { PostBody } from "@/components/post_detail/PostBody";
import PostHeader from "@/components/post_detail/PostHeader";
import TocSidebar from "@/components/post_detail/TableOfContentSidebar";
import TableOfContentTop from "@/components/post_detail/TableOfContentTop";
import { getMetadata } from "@/utils/metadata";
import { getPostDetailData, getStaticParams, parseToc } from "@/utils/posts";

export interface params {
  subject: string;
  category: string;
  post: string;
}

interface ParamType {
  params: params;
}

export async function generateStaticParams() {
  return getStaticParams("post");
}

export async function generateMetadata({ params: { subject, category, post } }: ParamType): Promise<Metadata> {
  const { title, description, keywords, thumbnail } = getPostDetailData({ subject, category, post });
  return getMetadata({
    title,
    description,
    asPath: `/${subject}/${category}/${post}`,
    keywords,
    ogImage: thumbnail,
  });
}

export default async function PostPage({ params: { subject, category, post } }: ParamType) {
  const { content, title, date, readingMinutes } = getPostDetailData({ subject, category, post });

  const toc = parseToc(content);

  return (
    <section className="prose mx-auto w-full max-w-[47rem] px-5 dark:prose-invert sm:px-6">
      <PostHeader
        title={title}
        subject={subject}
        category={category}
        date={date}
        readingMinutes={readingMinutes}
      />
      <TableOfContentTop toc={toc} />
      <article className="relative">
        <TocSidebar toc={toc} />
        <PostBody content={content} />
      </article>
      <hr />

      <FloatingButton />
    </section>
  );
}

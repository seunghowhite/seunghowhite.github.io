// import { Post } from "@/config/types";
import Mdx from "@/components/mdx/Mdx";
// @ts-expect-error no types
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
  subject?: string;
}

export const PostBody = ({ content, subject }: Props) => {
  const prettyCodeOptions = {
    theme: {
      dark: "github-dark-dimmed",
      light: "github-light",
    },
  };
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkBreaks],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug],
        },
      }}
      components={Mdx(subject)}
    />
  );
};

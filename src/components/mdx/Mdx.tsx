/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bookmark } from "@/components/mdx/Bookmark";
import { Callout } from "@/components/mdx/Callout";
import { ColoredHeading } from "@/components/mdx/ColoredHeading";
import { Image } from "@/components/mdx/Image";
import { ExternalLink } from "@/components/mdx/Link";
import { Toggle } from "@/components/mdx/Toggle";
import { MDXComponents } from "mdx/types";

const createMdxComponents = (subject?: string, category?: string, post?: string): MDXComponents => ({
  a: ExternalLink as any,
  img: ({ src, alt, ...props }: any) => (
    <Image
      src={src}
      alt={alt}
      subject={subject}
      category={category}
      post={post}
      {...props}
    />
  ),
  blockquote: Callout,
  Callout,
  Bookmark,
  Toggle,
  h1: ({ children, id, ...props }: any) => (
    <ColoredHeading
      level={1}
      subject={subject}
      id={id}
      {...props}
    >
      {children}
    </ColoredHeading>
  ),
  h2: ({ children, id, ...props }: any) => (
    <ColoredHeading
      level={2}
      subject={subject}
      id={id}
      {...props}
    >
      {children}
    </ColoredHeading>
  ),
  h3: ({ children, id, ...props }: any) => (
    <ColoredHeading
      level={3}
      subject={subject}
      id={id}
      {...props}
    >
      {children}
    </ColoredHeading>
  ),
});

export default createMdxComponents;

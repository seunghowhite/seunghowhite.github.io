import { Callout } from "@/components/mdx/Callout";
import { Image } from "@/components/mdx/Image";
import { ExternalLink } from "@/components/mdx/Link";
import { MDXComponents } from "mdx/types";

const Mdx: MDXComponents = {
  a: ExternalLink as any,
  img: Image as any,
  blockquote: Callout,
  Callout,
};

export default Mdx;

import { MetadataRoute } from "next";

import { BASE_URL } from "@/utils/metadata";
import { getPostList } from "@/utils/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postList = await getPostList();
  const sitemapPostList = postList.map(({ url, date }) => ({
    url: `${BASE_URL}/${url}`,
    lastModified: new Date(date),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    ...sitemapPostList,
  ];
}

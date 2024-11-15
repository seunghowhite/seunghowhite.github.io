import Image from "next/image";
import Link from "next/link";

import IconAlarmClock from "@/components/Icons/AlarmClock";
import IconCalendar from "@/components/Icons/Calendar";
import titleCase from "@/utils/titleCase";

interface PostList {
  category: string;
  thumbnail: string;
  title: string;
  desc: string;
  readingMinutes: number;
  date: string;
  url: string;
  post: string;
}
interface Props {
  postList: PostList[];
}
export default function PostList({ postList }: Props) {
  return (
    <section className="post px-8">
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {postList.map((post) => (
          <>
            <Link
              href={post.url}
              className="hidden md:block"
            >
              <li
                className="flex h-full flex-col overflow-hidden rounded-md border shadow-md transition hover:shadow-xl dark:border-slate-700
                  dark:hover:border-white"
              >
                <div className="relative aspect-video w-full rounded-t-md border-b">
                  <Image
                    src={post.thumbnail}
                    alt={`thumbnail for ${post.title}`}
                    sizes="(max-width: 500px) 50vw, 1050px"
                    fill
                    priority
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between px-4 pb-4 pt-1">
                  <div>
                    <div className="flex justify-between">
                      <h2 className="mb-3 mt-1 text-lg font-bold sm:text-xl md:text-lg">{titleCase(post.title)}</h2>
                      <div className="font-bold text-blue-600">{titleCase(post.category)}</div>
                    </div>
                    <h3 className="mb-2 line-clamp-2 h-12">{titleCase(post.desc)}</h3>
                  </div>
                  <div className="flex justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <IconAlarmClock />
                      <span>{post.readingMinutes}분</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconCalendar />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
            <Link
              href={post.url}
              className="md:hidden"
            >
              <li
                className="flex h-full overflow-hidden rounded-md border shadow-md transition hover:shadow-xl dark:border-slate-700
                  dark:hover:border-white"
              >
                {/* 텍스트 컨텐츠 */}
                <div className="flex flex-1 flex-col justify-between p-4 pt-1">
                  <div>
                    <div className="flex justify-between">
                      <h2 className="mb-3 mt-1 text-lg font-bold sm:text-xl md:text-lg">{titleCase(post.title)}</h2>
                      <div className="font-bold text-blue-600">{titleCase(post.category)}</div>
                    </div>
                    <h3 className="mb-2 line-clamp-2 h-12">{titleCase(post.desc)}</h3>
                  </div>

                  <div className="flex justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <IconCalendar />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <IconAlarmClock />
                      <span>{post.readingMinutes}분</span>
                    </div>
                  </div>
                </div>

                {/* 썸네일 이미지 */}
                <div className="relative hidden aspect-video w-[40%] flex-shrink-0 overflow-hidden rounded-md border sm:block">
                  <Image
                    src={post.thumbnail}
                    alt={`thumbnail for ${post.title}`}
                    sizes="(max-width: 500px) 50vw, 450px"
                    fill
                    priority
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              </li>
            </Link>
          </>
        ))}
      </ul>
    </section>
  );
}

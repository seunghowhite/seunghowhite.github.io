import Link from "next/link";

import IconCalendar from "@/components/Icons/Calendar";

interface PostFooterProps {
  subject: string;
  currentPostUrl: string;
  postList: Array<{
    post: string;
    title: string;
    url: string;
    date: string;
    category: string;
  }>;
}

const getSubjectColor = (subject?: string) => {
  switch (subject) {
    case "knowledge":
      return "var(--knowledge-color)";
    case "moral":
      return "var(--moral-color)";
    case "body":
      return "var(--body-color)";
    default:
      return "var(--knowledge-color)";
  }
};

// 좌우 화살표 아이콘
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const PostFooter = ({ subject, currentPostUrl, postList }: PostFooterProps) => {
  const subjectColor = getSubjectColor(subject);
  // 현재 포스트의 인덱스 찾기 (subject 전체 목록에서 URL로 매칭)
  const currentIndex = postList.findIndex((p) => p.url === currentPostUrl);

  // 이전/다음 포스트 찾기
  const prevPost = currentIndex > 0 ? postList[currentIndex - 1] : null;
  const nextPost = currentIndex < postList.length - 1 ? postList[currentIndex + 1] : null;

  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <div
      className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-6 dark:border-gray-700 sm:mt-12 sm:flex-row sm:justify-between
        sm:gap-4 sm:pt-8"
      style={{ "--subject-color": subjectColor } as React.CSSProperties}
    >
      {prevPost ? (
        <Link
          href={prevPost.url}
          className={`group relative flex flex-col gap-1.5 overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50
            to-white p-3 no-underline shadow-sm transition-all duration-300 hover:border-gray-300 hover:underline hover:shadow-md
            dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 dark:hover:border-gray-600 sm:gap-2 sm:rounded-xl sm:p-5 ${
            nextPost ? "flex-1" : "w-full" }`}
        >
          <div className="flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5 font-medium uppercase tracking-wide sm:gap-2">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1 sm:h-4 sm:w-4" />
              <span>이전 글</span>
            </div>
            <div className="flex min-w-0 items-center gap-1 sm:gap-1.5">
              <span
                className="min-w-0 truncate"
                title={prevPost.category}
              >
                {prevPost.category}
              </span>
              <span className="shrink-0 text-gray-400 dark:text-gray-500">/</span>
              <IconCalendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>{prevPost.date}</span>
            </div>
          </div>
          <h3
            className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:[color:var(--subject-color)]
              dark:text-gray-100"
          >
            {prevPost.title}
          </h3>
        </Link>
      ) : null}

      {nextPost ? (
        <Link
          href={nextPost.url}
          className={`group relative flex flex-col gap-1.5 overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50
            to-white p-3 text-right no-underline shadow-sm transition-all duration-300 hover:border-gray-300 hover:underline
            hover:shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 dark:hover:border-gray-600 sm:gap-2
            sm:rounded-xl sm:p-5 ${prevPost ? "flex-1 sm:ml-4" : "w-full"}`}
        >
          <div className="flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <IconCalendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>{nextPost.date}</span>
              <span className="text-gray-400 dark:text-gray-500">/</span>
              <span>{nextPost.category}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium uppercase tracking-wide sm:gap-2">
              <span>다음 글</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </div>
          </div>
          <h3
            className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:[color:var(--subject-color)]
              dark:text-gray-100"
          >
            {nextPost.title}
          </h3>
        </Link>
      ) : null}
    </div>
  );
};

export default PostFooter;

import Link from "next/link";

import IconAlarmClock from "@/components/Icons/AlarmClock";
import IconCalendar from "@/components/Icons/Calendar";

interface Props {
  post: any;
}

const PostHeader = ({ post }: Props) => {
  return (
    <header className="mt-14 text-center">
      <h1 className="mb-5 line-clamp-2 break-words text-2xl sm:text-3xl">
        {`포스트 제목 들어갈꺼 같은데 . 좀크게 들어갈꺼 같단 말이지..`}
      </h1>

      <div className="mb-3 text-base">
        <Link
          href={`/${post.subject}/${post.categroy}`}
          className="font-semibold text-blue-600 no-underline underline-offset-4 hover:underline"
        >
          {`여긴 category`}
        </Link>
      </div>
      <div className="flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <IconCalendar />
          <span>{`날짜`}</span>
        </div>
        <div className="flex items-center gap-1">
          <IconAlarmClock />
          <span>{`11`}분</span>
        </div>
      </div>
      <hr className="mt-5" />
    </header>
  );
};

export default PostHeader;

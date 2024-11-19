import Link from "next/link";

import IconAlarmClock from "@/components/Icons/AlarmClock";
import IconCalendar from "@/components/Icons/Calendar";
import titleCase from "@/utils/titleCase";

interface Props {
  title: string;
  subject: string;
  category: string;
  date: string;
  readingMinutes: number;
}

const PostHeader = ({ title, subject, category, date, readingMinutes }: Props) => {
  return (
    <header className="mt-14 text-center">
      <h1 className="mb-5 line-clamp-2 break-words text-2xl sm:text-3xl">{title}</h1>

      <div className="mb-3 text-base">
        <Link
          href={`/${subject}/${category}`}
          className="font-semibold text-blue-600 no-underline underline-offset-4 hover:underline"
        >
          {titleCase(category)}
        </Link>
      </div>
      <div className="flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <IconCalendar />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <IconAlarmClock />
          <span>{readingMinutes}분</span>
        </div>
      </div>
      <hr className="mt-5" />
    </header>
  );
};

export default PostHeader;

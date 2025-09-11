import { getCategoryCounts } from "@/utils/posts";

interface CategoryPercentageProps {
  subject: string;
  color: string;
  label: string;
}

// 전체 포스트 수를 계산하는 함수
const getTotalPostsCount = () => {
  const knowledgeCounts = getCategoryCounts("knowledge");
  const moralCounts = getCategoryCounts("moral");
  const bodyCounts = getCategoryCounts("body");

  return knowledgeCounts.all + moralCounts.all + bodyCounts.all;
};

export default function CategoryPercentage({ subject, color, label }: CategoryPercentageProps) {
  const categoryCounts = getCategoryCounts(subject);
  const currentCategoryPosts = categoryCounts.all;
  const totalPosts = getTotalPostsCount();
  const percentage = totalPosts > 0 ? Math.round((currentCategoryPosts / totalPosts) * 100) : 0;

  return (
    <div className="flex w-full items-center gap-3">
      {/* 진행률 바 */}
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            backgroundColor: color,
            width: `${percentage}%`,
          }}
        />
      </div>

      {/* 퍼센테이지와 포스트 수 */}
      <div className="flex min-w-fit items-center gap-2">
        <span
          className="text-sm font-medium"
          style={{ color }}
        >
          {percentage}%
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({currentCategoryPosts}/{totalPosts})
        </span>
      </div>
    </div>
  );
}

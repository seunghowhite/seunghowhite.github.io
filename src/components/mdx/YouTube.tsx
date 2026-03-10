"use client";

interface YouTubeProps {
  /** YouTube 영상 또는 Shorts URL (예: https://youtube.com/watch?v=xxx, https://youtu.be/xxx, https://youtube.com/shorts/xxx) */
  url: string;
  /** 영상 아래에 표시할 설명 (대괄호는 컴포넌트에서 자동으로 감쌈) */
  description?: string;
}

function getYouTubeVideoId(url: string): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();
  // youtu.be/VIDEO_ID
  const shortMatch = trimmed.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?|$)/);
  if (shortMatch) return shortMatch[1];
  // youtube.com/shorts/VIDEO_ID
  const shortsMatch = trimmed.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})(?:\?|$)/);
  if (shortsMatch) return shortsMatch[1];
  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  return null;
}

function isShortsUrl(url: string): boolean {
  return /youtube\.com\/shorts\//i.test(url?.trim() ?? "");
}

export const YouTube = ({ url, description }: YouTubeProps) => {
  const videoId = getYouTubeVideoId(url);
  const isShorts = isShortsUrl(url);

  if (!videoId) {
    return (
      <p
        className="my-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950
          dark:text-red-300"
      >
        잘못된 YouTube URL입니다: {url}
      </p>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <figure className="my-6">
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-black ${isShorts ? "mx-auto aspect-[9/16] max-w-[360px]" : "aspect-video"}`}
      >
        <iframe
          src={embedUrl}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {description && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">[{description}]</figcaption>
      )}
    </figure>
  );
};

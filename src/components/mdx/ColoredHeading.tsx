import { ReactNode } from "react";

interface ColoredHeadingProps {
  level: 1 | 2 | 3;
  children: ReactNode;
  subject?: string;
  id?: string;
  [key: string]: unknown; // 다른 props도 받을 수 있도록
}

const getSubjectColor = (subject?: string): string => {
  switch (subject) {
    case "knowledge":
      return "var(--knowledge-color)"; // 지(智) - 파란색
    case "moral":
      return "var(--moral-color)"; // 덕(德) - 주황색
    case "body":
      return "var(--body-color)"; // 체(體) - 빨간색
    default:
      return "inherit"; // 기본 색상
  }
};

export const ColoredHeading = ({ level, children, subject, id, ...props }: ColoredHeadingProps) => {
  const color = getSubjectColor(subject);

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  // 레벨별 크기 조정
  const getSizeClass = (level: number) => {
    switch (level) {
      case 1:
        return "text-4xl"; // h1: 큰 크기
      case 2:
        return "text-3xl "; // h2: 중간 크기
      case 3:
        return "text-lg"; // h3: 작은 크기
      default:
        return "font-bold";
    }
  };

  return (
    <HeadingTag
      id={id}
      style={{ color }}
      className={getSizeClass(level)}
      {...props}
    >
      {children}
    </HeadingTag>
  );
};

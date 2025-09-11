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

  return (
    <HeadingTag
      id={id}
      style={{ color }}
      className="font-bold"
      {...props}
    >
      {children}
    </HeadingTag>
  );
};

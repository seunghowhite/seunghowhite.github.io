import Link from "next/link";

import { cn } from "@/utils/cn";

const getSubjectColor = (subject?: string): string => {
  switch (subject) {
    case "knowledge":
      return "var(--knowledge-color)"; // 지(智) - 파란색
    case "moral":
      return "var(--moral-color)"; // 덕(德) - 주황색
    case "body":
      return "var(--body-color)"; // 체(體) - 빨간색
    default:
      return "#3b82f6"; // 기본 파란색
  }
};

interface Props {
  toc: {
    text: string;
    link: string;
    indent: number;
  }[];
  subject?: string;
}

const TableOfContentTop = ({ toc, subject }: Props) => {
  if (toc.length === 0) return null;

  return (
    <nav className="xl:hidden">
      <h2 id="table-of-contents-top">On this page</h2>
      <ul>
        {toc.map((item) => (
          <li
            key={item.link}
            className={cn(item.indent === 1 && "ml-4", "my-0 py-1")}
          >
            <Link
              href={item.link}
              className="underline-offset-4 transition-colors duration-200"
              style={
                {
                  "--hover-color": getSubjectColor(subject),
                  "--hover-color-rgb": getSubjectColor(subject).replace("var(--", "").replace(")", ""),
                } as React.CSSProperties
              }
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
    </nav>
  );
};

export default TableOfContentTop;

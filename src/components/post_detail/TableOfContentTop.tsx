import Link from "next/link";

import { cn } from "@/utils/cn";

interface Props {
  toc: {
    text: string;
    link: string;
    indent: number;
  }[];
}

const TableOfContentTop = ({ toc }: Props) => {
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
              className="underline-offset-4 hover:text-blue-600"
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

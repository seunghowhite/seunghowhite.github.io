import React from "react";

import Link from "next/link";

import Select from "@/components/ui/Select";
import { Subject } from "@/utils/post";

interface Props {
  list: { [key: string]: number };
  subject: Subject;
  targetCategory: string | null;
}

export default function CategoryList({ list, subject, targetCategory }: Props) {
  const cglist = Object.entries(list);

  return (
    <>
      <section className="post mt-12 hidden sm:block">
        <ul className="flex flex-wrap gap-3">
          {cglist.map(([category, count]) => (
            <li key={category}>
              <Link href={`/${subject}${category === "all" ? "" : "/" + category}`}>
                <div
                  className={`min-w-28 rounded-md px-2 py-1 text-center
                  ${(category === "all" && !targetCategory) || targetCategory === category ? "bg-muted" : "hover:bg-accent"}`}
                >
                  {category}({count})
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10 px-2 sm:hidden">
        <Select
          list={cglist}
          subject={subject}
          targetCategory={targetCategory}
        />
      </section>
    </>
  );
}

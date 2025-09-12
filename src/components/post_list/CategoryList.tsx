import React from "react";

import Link from "next/link";

import CategorySelect from "@/components/post_list/CategorySelect";
import titleCase from "@/utils/titleCase";

interface Props {
  list: { [key: string]: number };
  subject: string;
  targetCategory: string | null;
}

export default function CategoryList({ list, subject, targetCategory }: Props) {
  const cglist = Object.entries(list);

  return (
    <>
      <section className="post my-6 hidden md:block">
        <ul className="flex flex-wrap gap-3">
          {cglist.map(([category, count]) => (
            <li key={category}>
              <Link
                href={`/${subject}${category === "all" ? "" : "/" + category}`}
                title={`${titleCase(category)} 카테고리로 이동`}
              >
                <div
                  className={`min-w-28 rounded-md px-2 py-1 text-center
                  ${(category === "all" && !targetCategory) || targetCategory === category ? "bg-muted" : "hover:bg-accent"}`}
                >
                  {titleCase(category)}({count})
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="my-6 px-2 md:hidden">
        <CategorySelect
          list={cglist}
          subject={subject}
          targetCategory={targetCategory}
        />
      </section>
    </>
  );
}

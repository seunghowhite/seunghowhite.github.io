import Image from "next/image";
import Link from "next/link";

import stonTower from "@/public/home/stone_tower.png";

export default function HomePage() {
  return (
    <section className="post flex flex-col items-center gap-12 px-4 py-8">
      {/* 이미지 섹션 */}
      <div className="relative ml-14 aspect-square w-full max-w-[200px] overflow-hidden sm:ml-24 sm:max-w-[300px]">
        <Image
          src={stonTower}
          alt="Stone Tower"
          fill
          priority
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>

      {/* 텍스트 섹션 */}
      <div className="flex max-w-[600px] flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">처음은 다 어렵습니다</h1>
        <p className="break-words text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
          돌탑 쌓듯 꾸준하고 차근히 어떤 일을 행하면 좋은 결과가 있을 것입니다.
        </p>

        <div className="flex flex-col items-start gap-2 text-gray-700 dark:text-gray-300 sm:text-lg">
          <Link
            href={"/knowledge"}
            className="underline-offset-4 hover:underline"
          >
            <p>
              <strong
                className="sm:text-3xl"
                style={{ color: "#4A9ED4" }}
              >
                지:
              </strong>
              개발 관련 내용을 담고 있습니다.
            </p>
          </Link>
          <Link
            href={"/moral"}
            className="underline-offset-4 hover:underline"
          >
            <p>
              <strong
                className="sm:text-3xl"
                style={{ color: "#F5A45D" }}
              >
                덕:
              </strong>
              일상생활에서 얻는 생각을 기록합니다.
            </p>
          </Link>
          <Link
            href={"/body"}
            className="underline-offset-4 hover:underline"
          >
            <p>
              <strong
                className="sm:text-3xl"
                style={{ color: "#E97362" }}
              >
                체:
              </strong>
              몸을 가꾸는 기록을 담았습니다.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

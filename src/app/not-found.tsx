import Link from "next/link";

const NotFound = () => {
  return (
    <div className="grid flex-1 place-content-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Not Found</h1>
      <p className="mb-8 text-lg">찾을 수 없는 페이지입니다.</p>

      <Link href="/">홈으로</Link>
    </div>
  );
};

export default NotFound;

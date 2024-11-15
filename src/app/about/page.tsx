import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="grid flex-1 place-content-center text-center">
      <h1 className="mb-4 text-2xl font-bold">🚧 준비중 입니다 🛠️</h1>
      <p className="mb-8 text-lg">찾아주셔서 감사합니다.</p>

      <Link href="/">홈으로</Link>
    </div>
  );
};

export default AboutPage;

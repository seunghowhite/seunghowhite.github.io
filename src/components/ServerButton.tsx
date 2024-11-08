import Link from "next/link";

const ServerButton = () => {
  return (
    <div>
      <div className="w-36 bg-blue-100">ServerButton</div>
      <Link href={"/test1"}>test1 page</Link>
    </div>
  );
};

export default ServerButton;

import Link from "next/link";
import React from "react";

const ServerButton = () => {
  return (
    <div>
      <div>ServerButton</div>
      <Link href={"/test1"}>test1 page</Link>
    </div>
  );
};

export default ServerButton;

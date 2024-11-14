"use client";

import { useRouter } from "next/navigation";

const ClientButton = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-36 bg-red-100">ClientButton</div>
      <button onClick={() => router.push("/test2")}>test2</button>
    </div>
  );
};

export default ClientButton;

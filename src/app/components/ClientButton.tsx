"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ClientButton = () => {
  const router = useRouter();
  return (
    <div>
      <div className="bg-red-100">ClientButton</div>
      <button onClick={() => router.push("/test2")}>test2</button>
    </div>
  );
};

export default ClientButton;

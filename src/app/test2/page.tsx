"use client";

import Timer from "@/app/components/Timer";
import React from "react";

const Page = () => {
  return (
    <div className="h-[1000px]">
      height 1000px test 2 page it is Client Page
      <Timer onExpire={() => {}} second={3} />
    </div>
  );
};

export default Page;

"use client";

import toTop from "@/public/png/icon/to_top.png";
import Image from "next/image.js";
import { useEffect, useState } from "react";

function TopButton() {
  // ** State
  const [showButton, setShowButton] = useState(false);

  // ** Handler
  const onClickHandler = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  // ** ButtonShow Effect and Clean Up
  useEffect(() => {
    const handleShowButton = () => {
      window.scrollY > 220 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <div
      className={`
        fixed 
        z-[1] 
        right-[10%]
        bottom-[5%]
        transition-all 
        duration-500
        ease-in-out
        transform 
        ${showButton ? "opacity-100 scale-100" : "opacity-0 scale-0"}
      `}
    >
      <button
        className="
        p-2 rounded-full bg-slate-200 shadow-md 
        hover:bg-slate-300 hover:-translate-y-1
        hover:cursor-pointer hover:shadow-xl 
        transition-all duration-300 ease-in-out
        "
        onClick={onClickHandler}
      >
        <Image className="max-h-12" height={38} src={toTop} alt="totop" />
      </button>
    </div>
  );
}

export default TopButton;

"use client";

import { useEffect, useState } from "react";

import Image from "next/image.js";

import toTop from "@/public/png/icon/to_top.png";

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
      className={`fixed bottom-[5%] right-[10%] z-[1] transform transition-all duration-500 ease-in-out ${showButton ? "scale-100 opacity-100" : "scale-0 opacity-0"} `}
    >
      <button
        className="rounded-full bg-slate-200 p-2 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:bg-slate-300 hover:shadow-xl"
        onClick={onClickHandler}
      >
        <Image
          className="max-h-12"
          height={38}
          src={toTop}
          alt="totop"
        />
      </button>
    </div>
  );
}

export default TopButton;

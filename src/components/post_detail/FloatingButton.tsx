"use client";

import { useState } from "react";

import IconSetting from "@/components/Icons/Setting";
import { CopyLink, ScrollToComment, ScrollToTop, UtilButton } from "@/components/post_detail/UtilsButtons";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/utils/cn";

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((prev) => !prev);
  const handleOutsideClick = () => setVisible(false);

  const buttonRef = useOutsideClick<HTMLButtonElement>(handleOutsideClick);

  return (
    <div className="group fixed bottom-4 right-4 xl:hidden">
      <div className="group relative flex flex-col-reverse">
        <UtilButton
          onClick={toggleVisible}
          ref={buttonRef}
          className={cn(
            "absolute bottom-0 right-0 z-10 h-11 w-11 border transition",
            visible ? "bg-accent" : "bg-background"
          )}
          title="설정 버튼"
        >
          <IconSetting className="text-foreground" />
        </UtilButton>

        <CopyLink className={cn("absolute bottom-0 right-0 transition", visible && "-translate-y-12")} />
        <ScrollToTop className={cn("absolute bottom-0 right-0 transition", visible && "-translate-y-24")} />
        <ScrollToComment className={cn("absolute bottom-0 right-0 transition", visible && "-translate-y-36")} />
      </div>
    </div>
  );
};

export default FloatingButton;

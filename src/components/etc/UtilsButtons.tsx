import React, { Dispatch, SetStateAction, forwardRef, useState } from "react";

import IconCheck from "@/components/Icons/Check";
import IconComment from "@/components/Icons/Comment";
import IconCopy from "@/components/Icons/Copy";
import IconTotop from "@/components/Icons/ToTop";
import useInterval from "@/hooks/useInterval";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useToast from "@/hooks/useToast";
import useWatchTimeout from "@/hooks/useWatchTimeout";

interface Props {
  onClick: () => void;
  children: React.ReactElement;
  className?: string;
}

export const UtilButton = forwardRef<HTMLButtonElement, Props>(({ onClick, children, className }: Props, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`flex h-11 w-11 items-center justify-center rounded-md border bg-background hover:bg-accent ${className && className}`}
    >
      {children}
    </button>
  );
});

UtilButton.displayName = "UtilButton";

export const ScrollToTop = ({ className }: { className?: string }) => {
  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };
  return (
    <UtilButton
      onClick={scrollTop}
      className={className}
    >
      <IconTotop className="text-foreground" />
    </UtilButton>
  );
};

export const ScrollToComment = ({ className }: { className?: string }) => {
  const scrollToGiscus = () => document.querySelector(".giscus")?.scrollIntoView();
  return (
    <UtilButton
      onClick={scrollToGiscus}
      className={className}
    >
      <IconComment className="text-foreground" />
    </UtilButton>
  );
};

export const CopyLink = ({ className, url }: { className?: string; url?: string }) => {
  const [copied, setCopied] = useState(false);
  const { showToast, ToastContainer } = useToast(setCopied);
  const handleCopy = async () => {
    const copyUrl = url ? url : window.document.location.href;
    try {
      await navigator.clipboard.writeText(copyUrl);
      setCopied(true);
      if (!copied) {
        showToast({ message: "클립보드에 복사되었어요", type: "success" });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <>
      <UtilButton
        onClick={handleCopy}
        className={className}
      >
        {copied ? <IconCheck className="h-6 w-6 text-foreground" /> : <IconCopy className="text-foreground" />}
      </UtilButton>
      <ToastContainer />
    </>
  );
};

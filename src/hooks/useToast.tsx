import { useEffect, useState } from "react";

import ReactDOM from "react-dom";

interface ShowToastProps {
  message: string;
  type: "alert" | "success" | "default";
}
interface Toast extends ShowToastProps {
  id: number;
  isRemoving: boolean;
}
export default function useToast(setToastEnd?: React.Dispatch<React.SetStateAction<boolean>>) {
  const [toastList, setToastList] = useState<Toast[]>([]);
  const removeToast = (id: number) => {
    setToastList((prev) => prev.map((toast) => (toast.id === id ? { ...toast, isRemoving: true } : toast)));
    setTimeout(() => {
      setToastList((prev) => prev.filter((toast) => toast.id !== id));
    }, 500); // isRemoving 상태 0.5초 기다린 후 배열에서 삭제
  };
  const showToast = ({ message, type }: ShowToastProps) => {
    const newToast = { id: Date.now(), isRemoving: false, message, type };
    setToastList((prev) => [...prev, newToast]);

    // 3초 후 자동 제거
    setTimeout(() => {
      removeToast(newToast.id);
      if (setToastEnd) {
        setToastEnd(false);
      }
    }, 3000);
  };

  const ToastContainer = () => {
    const [isCSR, setIsCSR] = useState<boolean>(false);

    useEffect(() => {
      setIsCSR(true);
    }, []);

    if (!isCSR) return <></>;
    if (typeof window === "undefined") return <></>;
    return ReactDOM.createPortal(
      <div className="fixed bottom-5 right-5 z-50 space-y-2">
        {toastList.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-md px-4 py-2 shadow-md ${toast.isRemoving ? "animate-fadeout" : "animate-fadein"}
            ${toast.type === "success" ? "bg-background" : toast.type === "alert" ? "bg-red-500" : "bg-gray-800"}`}
          >
            {toast.message}
          </div>
        ))}
      </div>,
      document.getElementById("toast-root") as Element
    );
  };

  return { showToast, ToastContainer };
}

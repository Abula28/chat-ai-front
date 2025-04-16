import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { ModalProps } from "./ModalT";
import { TextView } from "../text-view/TextView";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg rounded-lg bg-neutral-650 shadow-xl ${className}`}
          >
            <div className="relative flex flex-col gap-6 p-6">
              <div className="flex items-center justify-between">
                {title && (
                  <TextView type="display-4" weight="bold">
                    {title}
                  </TextView>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="absolute right-6 top-6"
                >
                  <IoClose className="h-6 w-6" />
                </button>
              </div>
              <div className="max-h-[80vh] overflow-y-auto">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("portal") as HTMLElement,
  );
};

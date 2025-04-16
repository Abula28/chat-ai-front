import React from "react";
import { cn } from "../../../utils/helperFuncs";
import { InputProps } from "./InputT";
import { TextView } from "../text-view";

export const Input: React.FC<InputProps> = ({
  helperText,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col">
      <input
        className={cn(
          "w-full border-b bg-transparent py-2 text-base outline-none transition-colors",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-primary-100",
          className,
        )}
        {...props}
      />
      {helperText && (
        <TextView
          type="paragraph-small"
          className={cn(
            "mt-1 text-xs",
            error ? "text-red-500" : "text-gray-500",
          )}
        >
          {helperText}
        </TextView>
      )}
    </div>
  );
};

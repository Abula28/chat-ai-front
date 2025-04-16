import { SelectProps } from "./SelectT";
import { TextView } from "../text-view/TextView";
import { cn } from "../../../utils/helperFuncs";

export const Select: React.FC<SelectProps> = ({
  options,
  helperText,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="relative w-[120px]">
        <select
          className={cn(
            "bg-navy-700 w-full cursor-pointer appearance-none rounded-lg px-4 py-3 text-base text-white outline-none transition-colors",
            error
              ? "border-red-500 focus:border-red-500"
              : "hover:bg-navy-600 border-transparent",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-navy-700 cursor-pointer text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {helperText && (
        <TextView
          type="paragraph-small"
          className={cn("mt-1", error ? "text-red-500" : "text-gray-500")}
        >
          {helperText}
        </TextView>
      )}
    </div>
  );
};

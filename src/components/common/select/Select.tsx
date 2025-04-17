import { useEffect, useState } from "react";
import { SelectProps } from "./SelectT";
import { TextView } from "../text-view/TextView";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
export const Select: React.FC<SelectProps> = ({
  options,
  helperText,
  error,
  className,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(value || "");

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  const selectedValue = options?.find((e) => e.value === selected);

  const handleOptionClick = (e: string) => {
    setSelected(e);
    setIsOpen(false);
    onChange?.(e);
  };

  return (
    <div
      className={`relative flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 ${className ? className : ""}`}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      <TextView type="paragraph-small" className="text-white">
        {selectedValue ? selectedValue.label : placeholder}
      </TextView>

      {isOpen ? (
        <BiChevronUp className="h-4 w-4 text-white" />
      ) : (
        <BiChevronDown className="h-4 w-4 text-white" />
      )}

      {isOpen && (
        <div className="absolute left-0 top-[120%] z-[100] flex w-max min-w-full flex-col gap-1 rounded-md bg-[#1E2235] p-2">
          {options?.map((e) => (
            <div
              className={`rounded-sm p-2 duration-200 hover:bg-neutral-700/80 ${selected === e.value ? "bg-neutral-700" : ""}`}
              key={e.value}
              onClick={() => handleOptionClick(e.value)}
            >
              {e.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

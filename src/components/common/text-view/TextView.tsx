import { TextViewI } from "./TextViewT";

export const TextView: React.FC<TextViewI> = ({
  children,
  type,
  tag: Tag = "p",
  weight,
  className,
  ...rest
}) => {
  const textType: Record<TextViewI["type"], string> = {
    "display-10": "text-[72px] leading-[115%]",
    "display-9": "text-[60px] leading-[115%]",
    "display-8": "text-[48px] leading-[125%]",
    "display-7": "text-[36px] leading-[125%]",
    "display-6": "text-[30px] leading-[125%]",
    "display-5": "text-[24px] leading-[125%]",
    "display-4": "text-[20px] leading-[125%]",
    "display-3": "text-[18px] leading-[125%]",
    "display-2": "text-[16px] leading-[125%]",
    "display-1": "text-[14px] leading-[125%]",
    "paragraph-large": "text-[18px] leading-[150%]",
    "paragraph-default": "text-[16px] leading-[150%]",
    "paragraph-small": "text-[14px] leading-[150%]",
  };

  const weightClasses = {
    regular: "font-normal",
    "semi-bold": "font-semibold",
    bold: "font-bold",
    medium: "font-medium",
  };

  return (
    <Tag
      className={`font-inter ${textType[type]} ${weightClasses[weight ?? "regular"]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

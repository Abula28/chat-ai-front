import { DividerI } from "./DividerT";

const Divider: React.FC<DividerI> = ({
  type = "horizontal",
  className,
  ...rest
}) => {
  const dividerStyle = {
    horizontal: "w-full h-[1px]",
    vertical: "h-full w-[1px]",
  }[type];

  return (
    <div
      className={`bg-[#4B5268] ${dividerStyle} ${className ? className : ""}`}
      {...rest}
    ></div>
  );
};

export default Divider;

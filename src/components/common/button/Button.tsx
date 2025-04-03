import { ButtonI } from "./ButtonT";
import { TextView } from "../text-view/TextView";

export const Button: React.FC<ButtonI> = ({
  children,
  size = "default",
  variant = "primary",
  icon,
  count,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  const sizeClasses = {
    default: "h-[42px] px-4 py-3 gap-1",
    small: "h-[32px] px-4 py-2 gap-1",
  };

  const variantClasses = {
    secondary: `
      border border-white/60
      bg-transparent hover:bg-white/5 active:bg-white/10
      text-white
      disabled:border-neutral-400/60 disabled:text-neutral-400 disabled:cursor-not-allowed
    `,
    primary: `
      bg-primary-100 hover:bg-primary-100/90 active:bg-primary-100/80
      text-white
      disabled:bg-neutral-400 disabled:text-white disabled:cursor-not-allowed
    `,
    tertiary: `
      bg-white/10 hover:bg-white/15 active:bg-white/20
      text-white
      disabled:bg-white/5 disabled:text-white/50 disabled:cursor-not-allowed
    `,
  };

  const countClasses = {
    secondary: "bg-white/20 text-white",
    primary: "bg-white text-primary-100",
    tertiary: "bg-white/20 text-white",
  };

  const baseClasses = `
    flex items-center justify-center
    rounded-lg
    transition-all duration-200
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      <TextView
        type={size === "default" ? "paragraph-default" : "paragraph-small"}
        weight="semi-bold"
      >
        {children}
      </TextView>
      {count !== undefined && (
        <div
          className={`flex items-center justify-center rounded-full ${countClasses[variant]} `}
        >
          <TextView
            type={size === "default" ? "paragraph-small" : "display-1"}
            weight="semi-bold"
          >
            {count}
          </TextView>
        </div>
      )}
    </button>
  );
};

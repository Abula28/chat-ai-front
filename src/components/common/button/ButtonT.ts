import { ReactNode } from "react";

export type ButtonSizeT = "default" | "small";
export type ButtonVariantT = "primary" | "secondary" | "tertiary";

export interface ButtonI {
  children: ReactNode;
  size?: ButtonSizeT;
  variant?: ButtonVariantT;
  icon?: ReactNode;
  count?: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

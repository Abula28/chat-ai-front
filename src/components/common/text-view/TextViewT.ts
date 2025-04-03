import React from "react";

export type TextViewTypeT =
  | `display-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`
  | `paragraph-${"large" | "default" | "small"}`;

export type TextViewTagT = `h${1 | 2 | 3 | 4 | 5 | 6}` | "p" | "span";

export interface TextViewI {
  type: TextViewTypeT;
  weight?: "regular" | "semi-bold" | "bold";
  tag?: TextViewTagT;
  children: React.ReactNode;
  className?: string;
}

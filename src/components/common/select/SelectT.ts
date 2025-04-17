export interface SelectOption {
  value: string;
  label: React.ReactNode;
}

export interface SelectProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SelectOption[];
  helperText?: string;
  error?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

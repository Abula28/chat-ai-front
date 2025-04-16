export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  error?: boolean;
}

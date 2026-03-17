import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  ref?: React.Ref<HTMLButtonElement>;
}

export const Checkbox = ({
  className,
  checked = false,
  onCheckedChange,
  ref,
  ...props
}: CheckboxProps) => {
  return (
    <button
      ref={ref}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "peer size-4 shrink-0 rounded-sm border border-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked && "bg-primary border-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      {checked && <Check className="size-3.5 text-white mx-auto" />}
    </button>
  );
};

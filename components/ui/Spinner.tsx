// components/ui/Spinner.tsx
import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerVariant = "primary" | "white" | "muted";

interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string; // accessibility label
  className?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-[3px]",
  xl: "w-12 h-12 border-4",
};

const variantMap: Record<SpinnerVariant, string> = {
  primary: "border-purple-200 border-t-purple-500",
  white: "border-white/30 border-t-white",
  muted: "border-grey-200 border-t-grey-500",
};

export function Spinner({
  size = "md",
  variant = "primary",
  label = "Loading...",
  className,
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-block rounded-full animate-spin",
        sizeMap[size],
        variantMap[variant],
        className,
      )}
    />
  );
}

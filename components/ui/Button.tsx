import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseStyles = [
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap font-(family-name:--font-inter) font-medium",
  "transition-colors duration-200",
  "disabled:cursor-not-allowed",
].join(" ");

const variants: Record<Variant, string> = {
  primary: [
    "gap-[10px] rounded-lg bg-purple-500 px-[25px] py-[17px] text-[20px] leading-none text-white",
    "hover:bg-purple-600",
    "active:bg-purple-700",
    "focus-visible:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-100",
    "disabled:bg-grey-300 disabled:text-grey-400",
  ].join(" "),
  outline: [
    "gap-[2px] rounded-lg border-2 border-purple-300 bg-transparent px-[16px] py-[12px] text-[20px] leading-none text-purple-500",
    "hover:border-purple-600 hover:bg-purple-600 hover:text-white",
    "active:border-purple-700 active:bg-purple-700 active:text-white",
    "focus-visible:border-purple-700 focus-visible:bg-purple-700 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-purple-100",
    "disabled:border-grey-400 disabled:bg-grey-300 disabled:text-grey-400",
  ].join(" "),
  ghost: [
    "gap-[10px] border-b border-purple-500 bg-transparent px-[12px] py-[12px] text-[16px] leading-6 text-purple-500",
    "hover:border-purple-600 hover:text-purple-600",
    "active:border-purple-700 active:text-purple-700",
    "focus-visible:border-purple-700 focus-visible:text-purple-700 focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-purple-700",
    "disabled:border-grey-300 disabled:text-grey-300",
  ].join(" "),
};

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      variant = "primary",
      className,
      children,
      leftIcon,
      rightIcon,
      type,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
        {children ? <span>{children}</span> : null}
        {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
      </button>
    );
  },
);

CTAButton.displayName = "CTAButton";

export { CTAButton };

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  // Figma: bg Purple/500, text white, px-25 py-17, rounded-8, Inter Medium 20px
  primary: [
    "bg-purple-500 text-white rounded-lg px-[25px] py-[17px] text-[20px] font-medium",
    "hover:bg-purple-600",
    "active:bg-purple-700",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500",
    "disabled:bg-grey-300 disabled:text-grey-400 disabled:cursor-not-allowed",
  ].join(" "),
  // Figma: border Purple/300, text Purple/500, px-16 py-12, rounded-8, Inter Medium 20px
  outline: [
    "border border-purple-300 text-purple-500 rounded-lg px-[16px] py-[12px] text-[20px] font-medium bg-transparent",
    "hover:border-purple-500 hover:bg-purple-50",
    "active:border-purple-600 active:text-purple-600",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500",
    "disabled:border-grey-400 disabled:text-grey-400 disabled:bg-grey-300 disabled:cursor-not-allowed",
  ].join(" "),
  // Figma: stroke Purple/500 (no fill), text Purple/500, px-12 py-12, no radius, Inter Medium 16px
  ghost: [
    "border border-purple-500 text-purple-500 px-[12px] py-[12px] text-[16px] font-medium bg-transparent",
    "hover:bg-purple-50",
    "active:bg-purple-100",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500",
    "disabled:border-grey-300 disabled:text-grey-300 disabled:cursor-not-allowed",
  ].join(" "),
};

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-(family-name:--font-inter) transition duration-200",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

CTAButton.displayName = "CTAButton";

export { CTAButton };

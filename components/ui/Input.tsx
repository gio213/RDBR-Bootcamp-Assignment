import {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
} from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  rightAdornment?: ReactNode;
}

// Figma specs:
//   Label:  Inter Medium 14px — grey-700 default, error color on error
//   Field:  border-grey-200 default, border-grey-400 active/filled, border-error on error
//           padding: 12px 15px 12px 13px, rounded-8px
//   Helper: Inter Regular 12px — grey-300 default, error color on error

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error = false,
      className,
      id,
      rightAdornment,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1 font-(family-name:--font-inter)">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-[14px] font-medium leading-[1.21]",
              error ? "text-error" : "text-grey-700",
            )}
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-lg border bg-transparent py-3 pl-3.25",
              rightAdornment ? "pr-11" : "pr-3.75",
              "text-[14px] font-medium text-grey-900 placeholder:text-grey-300",
              "outline-none transition duration-150",
              error
                ? "border-error focus:border-error"
                : "border-grey-200 hover:border-grey-300 focus:border-grey-400",
              "disabled:cursor-not-allowed disabled:border-grey-200 disabled:text-grey-300",
              className,
            )}
            aria-invalid={error}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {rightAdornment ? (
            <div className="absolute inset-y-0 right-3 flex items-center text-grey-400">
              {rightAdornment}
            </div>
          ) : null}
        </div>

        {helperText && (
          <p
            id={`${inputId}-helper`}
            className={cn(
              "text-[12px] font-normal leading-4 tracking-[0.024px]",
              error ? "text-error" : "text-grey-300",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

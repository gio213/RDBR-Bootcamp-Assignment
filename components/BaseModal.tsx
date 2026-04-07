// components/ui/BaseModal.tsx
"use client";

import { useEffect } from "react";
import { CloseIcon } from "@/helper/Icon";
import { cn } from "@/lib/utils";
import StepBar from "@/forms/register/StepBar";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;

  // header
  title: string;
  subtitle?: string;

  // stepper — only rendered when provided
  step?: number;
  totalSteps?: number;

  // footer — only rendered when provided
  footerText?: string;
  footerLinkLabel?: string;
  onFooterLinkClick?: () => void;

  className?: string;
}

export function BaseModal({
  open,
  onClose,
  children,
  title,
  subtitle,
  step,
  totalSteps,
  footerText,
  footerLinkLabel,
  onFooterLinkClick,
  className,
}: BaseModalProps) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const showStepper = step !== undefined && totalSteps !== undefined;
  const showFooter =
    footerText !== undefined &&
    footerLinkLabel !== undefined &&
    onFooterLinkClick !== undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-grey-950/35 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="base-modal-title"
        className={cn(
          "relative z-10 w-full max-w-115 rounded-xl bg-white p-12.5 shadow-[0_24px_64px_rgba(14,8,54,0.12)]",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex size-6 items-center justify-center text-grey-400 transition-colors hover:text-grey-700"
        >
          <CloseIcon />
        </button>

        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <h2
                id="base-modal-title"
                className="text-[32px] font-semibold leading-none text-grey-900"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-[14px] font-medium leading-none text-grey-500">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Stepper — register only */}
            {showStepper && (
              <div className="flex items-start gap-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <StepBar
                    key={i}
                    active={step >= i + 1}
                    current={step === i + 1}
                  />
                ))}
              </div>
            )}

            {/* Content */}
            {children}
          </div>

          {/* Footer — login + register only, not profile */}
          {showFooter && (
            <div className="flex w-full flex-col items-center gap-2">
              <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="h-px bg-grey-200" />
                <span className="bg-white px-2 text-[14px] font-medium text-grey-400">
                  or
                </span>
                <div className="h-px bg-grey-200" />
              </div>

              <p className="text-center text-[12px] font-normal text-grey-500">
                {footerText}{" "}
                <button
                  type="button"
                  onClick={onFooterLinkClick}
                  className="text-[14px] font-medium text-grey-900 underline underline-offset-2"
                >
                  {footerLinkLabel}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

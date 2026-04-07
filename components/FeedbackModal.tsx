"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { CTAButton } from "./ui/Button";

// Figma: Modal_Icons has Complete / Success / Warning / User variants
export type FeedbackVariant = "success" | "complete" | "warning" | "user";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  variant?: FeedbackVariant;
  title: string;
  description?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function FeedbackModal({
  open,
  onClose,
  variant = "success",
  title,
  description,
  primaryLabel = "Continue",
  onPrimary,
  secondaryLabel,
  onSecondary,
}: FeedbackModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Trap scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-grey-950/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        ref={dialogRef}
        className="relative z-10 mx-4 flex w-full max-w-120 flex-col items-center gap-6 rounded-2xl bg-white px-8 py-10 shadow-[0_24px_64px_rgba(14,8,54,0.16)]"
      >
        {/* Icon */}
        <div
          className={cn(
            "flex size-18 items-center justify-center rounded-full",
            iconBg[variant],
          )}
        >
          <ModalIcon variant={variant} />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2
            id="feedback-title"
            className="font-(family-name:--font-noto-sans) text-[22px] font-semibold leading-[1.4] text-grey-900"
          >
            {title}
          </h2>
          {description && (
            <p className="text-[14px] font-normal leading-[1.6] text-grey-500">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          {secondaryLabel && (
            <CTAButton
              variant="outline"
              onClick={onSecondary ?? onClose}
              className="w-full sm:w-auto"
            >
              {secondaryLabel}
            </CTAButton>
          )}
          <CTAButton
            variant="primary"
            onClick={onPrimary ?? onClose}
            className="w-full sm:w-auto"
          >
            {primaryLabel}
          </CTAButton>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-grey-400 hover:bg-grey-100 hover:text-grey-700 transition-colors"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

const iconBg: Record<FeedbackVariant, string> = {
  success: "bg-success-light",
  complete: "bg-purple-50",
  warning: "bg-[rgba(244,163,22,0.1)]",
  user: "bg-purple-50",
};

function ModalIcon({ variant }: { variant: FeedbackVariant }) {
  if (variant === "success") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M7 19l7 7L29 10"
          stroke="#1dc31d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (variant === "complete") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M7 19l7 7L29 10"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 19l5 5"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (variant === "warning") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M18 8v12M18 24v2"
          stroke="#f4a316"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  // user
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="13" r="5" stroke="#4f46e5" strokeWidth="2.5" />
      <path
        d="M7 30c0-6.075 4.925-11 11-11s11 4.925 11 11"
        stroke="#4f46e5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 3l10 10M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

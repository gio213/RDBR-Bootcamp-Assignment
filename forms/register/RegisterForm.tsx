"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterInput,
} from "@/validations/auth-validation";
import { Input } from "@/components/ui/Input";
import { CTAButton } from "@/components/ui/Button";
import { BackArrowIcon, UploadIcon } from "@/helper/Icon";
import { api } from "@/lib/api";
import type { AuthResponse } from "@/types/auth";
import { BaseModal } from "@/components/BaseModal";
import { setAuthToken } from "@/helper/set-token";
import { useRouter } from "next/navigation";

type SignUpStep = 1 | 2 | 3;

interface RegisterFormProps {
  open: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
  onSuccess?: () => void;
}

export function RegisterForm({
  open,
  onClose,
  onLoginClick,
  onSuccess,
}: RegisterFormProps) {
  const [step, setStep] = useState<SignUpStep>(1);
  const [serverError, setServerError] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  function handleClose() {
    setStep(1);
    setServerError(null);
    reset();
    onClose();
  }

  async function handleNext() {
    if (step === 1) {
      const valid = await trigger("email");
      if (valid) setStep(2);
      return;
    }

    if (step === 2) {
      // validate individual fields first
      const valid = await trigger(["password", "password_confirmation"]);
      if (!valid) return;

      // 🔥 manual cross-field validation (reliable fix)
      const { password, password_confirmation } = getValues();

      if (password !== password_confirmation) {
        setError("password_confirmation", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      clearErrors("password_confirmation");
      setStep(3);
    }
  }

  function handleBack() {
    setStep((s) => (s > 1 ? ((s - 1) as SignUpStep) : s));
  }

  const router = useRouter();

  const onSubmit = async (data: RegisterInput) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("username", data.username);

    const avatarFile = avatarRef.current?.files?.[0];
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = await api.post<AuthResponse>("register", formData);

      if (res.data) {
        setAuthToken(res.data.token);
        router.refresh();
        handleClose();
        onSuccess?.();
      } else {
        setServerError("Registration failed");
      }
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < 3) {
      await handleNext();
      return;
    }

    await handleSubmit(onSubmit)(event);
  }

  return (
    <BaseModal
      title="Create Account"
      subtitle="Join and start learning today"
      totalSteps={3}
      open={open}
      onClose={handleClose}
      step={step}
      footerLinkLabel="Log In"
      footerText="Already have an account? "
      onFooterLinkClick={() => {
        handleClose();
        onLoginClick?.();
      }}
    >
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="absolute left-4 top-4 flex size-8 items-center justify-center text-grey-400 transition-colors hover:text-grey-700"
          >
            <BackArrowIcon />
          </button>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-1">
            <Input
              label="Email*"
              placeholder="you@example.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-1">
              <Input
                label="Password*"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Input
                label="Confirm Password*"
                type="password"
                {...register("password_confirmation")}
              />
              {errors.password_confirmation && (
                <span className="text-xs text-red-500">
                  {errors.password_confirmation.message}
                </span>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex flex-col gap-1">
              <Input label="Username*" {...register("username")} />
              {errors.username && (
                <span className="text-xs text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[14px] font-medium text-grey-700">
                Upload Avatar
              </label>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border px-4 py-7.5">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  ref={avatarRef}
                />
                <UploadIcon />
                <p className="text-[14px]">Upload file</p>
              </label>
            </div>
          </>
        )}

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <CTAButton type="submit" disabled={isSubmitting}>
          {step === 3 ? "Sign Up" : "Next"}
        </CTAButton>
      </form>
    </BaseModal>
  );
}

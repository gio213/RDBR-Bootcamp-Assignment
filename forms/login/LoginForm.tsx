"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BaseModal } from "@/components/BaseModal";
import { CTAButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api";
import type { AuthResponse } from "@/types/auth";
import { type LoginInput, loginSchema } from "@/validations/auth-validation";
import { setAuthToken } from "@/helper/set-token";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  open: boolean;
  onClose: () => void;
  onSignUpClick?: () => void;
  onSuccess?: () => void;
}

const LoginForm = ({
  open,
  onClose,
  onSignUpClick,
  onSuccess,
}: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  function handleClose() {
    setServerError(null);
    reset();
    onClose();
  }

  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await api.post<AuthResponse, LoginInput>("login", data);
      console.log("res", res.data);
      if (res.data) {
        setAuthToken(res.data.token);
        router.refresh();
        handleClose();
        onSuccess?.();
      } else {
        setServerError("Login failed");
      }
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  return (
    <BaseModal
      title="Welcome Back"
      subtitle="Log in to continue your learning"
      open={open}
      onClose={handleClose}
      footerText="Don’t have an account?"
      footerLinkLabel="Sign Up"
      onFooterLinkClick={() => {
        handleClose();
        onSignUpClick?.();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Input
            label="Email*"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            label="Password*"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <CTAButton
          type="submit"
          disabled={isSubmitting}
          className="h-11.75 w-full px-2.5 py-2.5 text-[16px] leading-6"
        >
          Log In
        </CTAButton>
      </form>
    </BaseModal>
  );
};

export default LoginForm;

import { useState, type ReactElement } from "react";

import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { FormInput } from "@/components/forms/form-input";
import { SubmitButton } from "@/components/forms/submit-button";

import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

import { useLogin } from "../hooks/use-login";

import { GoogleLoginButton } from "./google-login-button";

export function LoginForm(): ReactElement {
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onSubmit",
  });

  const onSubmit = (values: LoginFormValues): void => {
    loginMutation.mutate(values);
  };

  return (
    <div
      className="
        flex
        min-h-[720px]
        flex-col
        rounded-[36px]
        border
        border-border/50
        bg-background/95
        p-10
        shadow-[0_30px_120px_rgba(0,0,0,0.12)]
        backdrop-blur-xl
      "
    >
      {/* Header */}

      <div
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            bg-primary/10
            text-primary
            mb-6
            flex
            size-16
            items-center
            justify-center
            rounded-2xl
          "
        >
          <ShieldCheck className="size-8" />
        </div>

        <div
          className="
            bg-primary/10
            text-primary
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-primary/20
            px-4
            py-2
            text-xs
            font-semibold
          "
        >
          <LockKeyhole className="size-3.5" />

          <span>Secure Authentication</span>
        </div>

        <h1
          className="
            mt-6
            text-4xl
            font-bold
            tracking-tight
          "
        >
          Welcome Back
        </h1>

        <p
          className="
            text-muted-foreground
            mt-3
            max-w-[320px]
            text-center
            text-sm
            leading-7
          "
        >
          Sign in to access your portfolio administration dashboard and manage
          your projects, blogs, services, skills, and portfolio content.
        </p>
      </div>

      {/* Form */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
            flex
            flex-1
            flex-col
            justify-center
            space-y-6
          "
          noValidate
        >
          <FormInput
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="admin@example.com"
            type="email"
            autoComplete="email"
            disabled={loginMutation.isPending}
            required
          />

          <div className="relative">
            <FormInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              disabled={loginMutation.isPending}
              required
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="
                absolute
                right-2
                top-[34px]
                h-8
                w-8
                rounded-lg
              "
              onClick={() => setShowPassword((previous) => !previous)}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>

          <SubmitButton
            className="
              h-12
              w-full
              text-sm
              font-semibold
            "
            isLoading={loginMutation.isPending}
            loadingText="Signing in..."
          >
            Sign In
          </SubmitButton>

          {/* Divider */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div className="bg-border h-px flex-1" />

            <span
              className="
                text-muted-foreground
                text-xs
                font-medium
                uppercase
                tracking-wider
              "
            >
              Or continue with
            </span>

            <div className="bg-border h-px flex-1" />
          </div>

          {/* Google Login */}

          <GoogleLoginButton />
        </form>
      </Form>

      {/* Footer */}

      <div
        className="
          text-muted-foreground
          mt-auto
          flex
          items-center
          justify-center
          gap-2
          border-t
          border-border/50
          pt-6
          text-xs
        "
      >
        <ShieldCheck className="size-3.5 shrink-0" />

        <span>Protected administration area. Authorized users only.</span>
      </div>
    </div>
  );
}

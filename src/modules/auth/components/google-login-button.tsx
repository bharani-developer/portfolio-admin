// src\modules\auth\components\google-login-button.tsx

import { type ReactElement } from "react";

import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

import { toast } from "sonner";

import { useGoogleLogin } from "../hooks/use-google-login";

export function GoogleLoginButton(): ReactElement {
  const googleLoginMutation = useGoogleLogin();

  const handleSuccess = (credentialResponse: CredentialResponse): void => {
    const credential = credentialResponse.credential;

    if (!credential) {
      toast.error("Google authentication failed.");

      return;
    }

    googleLoginMutation.mutate({
      token: credential,
    });
  };

  const handleError = (): void => {
    toast.error("Google authentication failed.");
  };

  return (
    <div
      className="
        flex
        w-full
        justify-center
      "
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        text="signin_with"
        shape="pill"
        width="360"
      />
    </div>
  );
}

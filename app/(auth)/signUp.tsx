import AuthForm, { AuthProps } from "@/components/auth/AuthForm";
import KeyboardDismissView from "@/components/auth/KeyboardDismissView";
import { signUp, useAuthAction } from "@/logic/auth";
import { useCallback } from "react";

export function SignUpPage() {
  const { handleAuthAction } = useAuthAction();

  const handleSignUp = useCallback(({ email, password, name }: AuthProps) => {
    handleAuthAction(() => signUp(email, password, name));
  }, [handleAuthAction]);

  return (
    <KeyboardDismissView>
      <AuthForm title="Sign Up" nameEnabled onSubmit={handleSignUp} />
    </KeyboardDismissView>
  );
}


SignUpPage.displayName = "SignUpPage";

export default SignUpPage;
import AuthForm from "@/components/auth/Form";
import KeyboardDismissView from "@/components/auth/KeyboardDismissView";
import { signUp, useAuthAction } from "@/logic/auth";
import { useCallback } from "react";

export function SignUpPage() {
  const { handleAuthAction } = useAuthAction();

  const handleSignUp = useCallback((email: string, password: string) => {
    handleAuthAction(() => signUp(email, password));
  }, [handleAuthAction]);

  return (
    <KeyboardDismissView>
      <AuthForm title="Sign Up" onSubmit={handleSignUp} />
    </KeyboardDismissView>
  );
}


SignUpPage.displayName = "SignUpPage";

export default SignUpPage;
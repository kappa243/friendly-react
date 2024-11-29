import AuthForm, { AuthProps } from "@/components/auth/AuthForm";
import KeyboardDismissView from "@/components/auth/KeyboardDismissView";
import { useLockingFunction } from "@/hooks/useLockingHandle";
import { signUp } from "@/logic/auth";
import { useCallback } from "react";

export function SignUpPage() {
  const { action } = useLockingFunction();

  const handleSignUp = useCallback(({ email, password, name }: AuthProps) => {
    action(() => signUp(email, password, name));
  }, [action]);

  return (
    <KeyboardDismissView>
      <AuthForm title="Sign Up" nameEnabled onSubmit={handleSignUp} />
    </KeyboardDismissView>
  );
}


SignUpPage.displayName = "SignUpPage";

export default SignUpPage;
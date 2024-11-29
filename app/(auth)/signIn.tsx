import AuthForm from "@/components/auth/AuthForm";
import KeyboardDismissView from "@/components/auth/KeyboardDismissView";
import TRouterLink from "@/components/theme/TRouterLink";
import { TText } from "@/components/theme/TText";
import { useLockingFunction } from "@/hooks/useLockingHandle";
import { signIn } from "@/logic/auth";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

export function SignInPage() {
  const { action } = useLockingFunction();

  const handleSignIn = useCallback(({ email, password }: { email: string; password: string }) => {
    action(() => signIn(email, password));
  }, [action]);


  return (
    <KeyboardDismissView>
      <AuthForm title="Sign In" onSubmit={handleSignIn} />
      <TText style={styles.bottom_text}>
        Don't have an account? <TRouterLink href="/(auth)/signUp">Create a new one!</TRouterLink>
      </TText>
    </KeyboardDismissView>
  );
}

const styles = StyleSheet.create({
  bottom_text: {
    textAlign: "center",
    marginTop: 10
  }
});


SignInPage.displayName = "SignInPage";

export default SignInPage;
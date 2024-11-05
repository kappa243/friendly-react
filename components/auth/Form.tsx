import { useCallback, useState } from "react";
import { TTextInput } from "../theme/TTextInput";
import TButton from "../theme/TButton";
import { StyleSheet, View } from "react-native";

export type AuthFormProps = {
  title: string;
  onSubmit: (email: string, password: string) => void;
};

export function AuthForm({ title, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("user123");

  const handleSubmit = useCallback(() => {
    onSubmit(email, password);
  }, [email, password, onSubmit]);

  return (
    <View >
      <TTextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <TTextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <TButton style={styles.button} title={title} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 5
  }
});

AuthForm.displayName = "AuthForm";

export default AuthForm;
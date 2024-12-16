import { useCallback, useState } from "react";
import { TTextInput } from "../theme/TTextInput";
import TButton from "../theme/TButton";
import { StyleSheet, View } from "react-native";

export type AuthProps = {
  email: string;
  password: string;
  name: string;
}

export type AuthFormProps = {
  title: string;
  nameEnabled?: boolean;
  onSubmit: (props: AuthProps) => void;
};

export function AuthForm({ title, nameEnabled = false, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("user123");
  const [name, setName] = useState("User");

  const handleSubmit = useCallback(() => {
    onSubmit({ email, password, name });
  }, [email, password, name, onSubmit]);

  return (
    <View>
      {nameEnabled && <TTextInput value={name} onChangeText={setName} placeholder="Name" keyboardType="ascii-capable" />}
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
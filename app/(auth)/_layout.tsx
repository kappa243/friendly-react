import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="signIn" options={{ title: "Login" }} />
      <Stack.Screen name="signUp" options={{ title: "Register", presentation: "modal", animation: "slide_from_right" }} />
    </Stack>
  );
}


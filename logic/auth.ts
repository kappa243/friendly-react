import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useCallback, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { create } from "zustand";

export type UserState = {
  user: FirebaseAuthTypes.User | null;
}

export type UserAction = {
  setUser: (user: UserState["user"]) => void;
}

export const useUserStore = create<UserState & UserAction>((set) => ({
  user: auth().currentUser,
  setUser: (user: UserState["user"]) => set(() => ({ user: user }))
}));


export function signUp(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  return auth().createUserWithEmailAndPassword(email, password);
}

export function signIn(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  return auth().signInWithEmailAndPassword(email, password);
}

export function signOut() {
  return auth().signOut();
}

export function subscribeAuthState(callback: (user: FirebaseAuthTypes.User | null) => void) {
  return auth().onAuthStateChanged(callback);
}


export function useAuthAction() {
  const [loading, setLoading] = useState(false);

  const handleAuthAction = useCallback(async (action: () => Promise<unknown>) => {
    setLoading(true);
    Keyboard.dismiss(); // removes autofill overlays
    try {
      await action();
    } catch (error) {
      const err = error as Error;
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, handleAuthAction } as const;
}
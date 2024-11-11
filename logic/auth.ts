import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useCallback, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { create } from "zustand";
import { isStringEmpty } from "./utils";
import database from "@react-native-firebase/database";

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


export function updateDisplayName(name: string) {
  return auth().currentUser?.updateProfile({ displayName: name });
}

export function signUp(email: string, password: string, name: string) {
  if (isStringEmpty(email) || isStringEmpty(password) || isStringEmpty(name)) {
    throw new Error("Name, email and password are required");
  }

  return auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user?.updateProfile({ displayName: name });
    })
    .then(() => {
      return database().ref(`users/${auth().currentUser?.uid}`).set({
        name: name,
        email: email
      });
    });
}

export function signIn(email: string, password: string) {
  if (isStringEmpty(email) || isStringEmpty(password)) {
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
    if (loading) return;

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
  }, [loading]);

  return { loading, handleAuthAction } as const;
}
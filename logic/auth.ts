import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";
import { isStringEmpty } from "./utils";
import { setUserEmail, setUserName } from "./userData";

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

export async function signUp(email: string, password: string, name: string) {
  if (isStringEmpty(email) || isStringEmpty(password) || isStringEmpty(name)) {
    throw new Error("Name, email and password are required");
  }

  const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  await userCredential.user?.updateProfile({ displayName: name });

  setUserName(name);
  setUserEmail(email);
}

export async function signIn(email: string, password: string) {
  if (isStringEmpty(email) || isStringEmpty(password)) {
    throw new Error("Email and password are required");
  }

  await auth().signInWithEmailAndPassword(email, password);
}

export function signOut() {
  return auth().signOut();
}

export function subscribeAuthState(callback: (user: FirebaseAuthTypes.User | null) => void) {
  return auth().onAuthStateChanged(callback);
}

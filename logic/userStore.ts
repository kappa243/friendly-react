import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";

export type UserState = {
  user: FirebaseAuthTypes.User | null;
}

export type UserAction = {
  setUser: (user: UserState["user"]) => void;
}

export type UserID = string;

export const useUserStore = create<UserState & UserAction>((set) => ({
  user: auth().currentUser,
  setUser: (user: UserState["user"]) => set(() => ({ user: user }))
}));

export function getUser() {
  const user = useUserStore.getState().user;

  if (!user)
    throw new Error("No user logged in");

  return user;
}
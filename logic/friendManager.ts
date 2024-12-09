import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { getUserRef, useUserRef } from "./userData";
import { UserID } from "./auth";
import { getDatabase } from "./database";

const db = getDatabase();

export function useFriendList(): string[] | null {
  const [friends, setFriends] = useState<string[]>([]);
  const ref = useUserRef();

  useEffect(() => {
    const refFriends = ref.child("friends");
    const onFriendsChange = refFriends.on("value", (snapshot) => {
      let res = snapshot.val() ? Object.keys(snapshot.val()) : [];

      // filter out current user
      const curr_user = auth().currentUser?.uid;
      if (curr_user)
        res = res.filter((uid) => uid !== curr_user);

      setFriends(res);
    });

    return () => refFriends.off("value", onFriendsChange);
  }, [ref]);

  return friends;
}

const users_ref = db.ref("/users");

export function useUserList(): string[] | null {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const refUsers = users_ref.on("value", (snapshot) => {
      let res = snapshot.val() ? Object.keys(snapshot.val()) : [];

      // filter out current user
      const curr_user = auth().currentUser?.uid;
      if (curr_user)
        res = res.filter((uid) => uid !== curr_user);

      setUsers(res);
    });

    return () => users_ref.off("value", refUsers);
  }, []);

  return users;
}

export function addFriend(uid: UserID) {
  const ref = getUserRef();

  return ref.child("friends").child(uid).set(true);
}

export function removeFriend(uid: UserID) {
  const ref = getUserRef();

  return ref.child("friends").child(uid).remove();
}

import { useEffect, useState } from "react";
import { UserID, useUserStore } from "./auth";
import { getDBRef, useDBRef } from "./database";

const friends_path = "/friends";

export function useFriendList(): string[] | null {
  const [friends, setFriends] = useState<string[]>([]);
  const { user } = useUserStore();
  const friends_ref = useDBRef(friends_path);

  useEffect(() => {
    if (!user) {
      setFriends([]);
      return;
    }

    const ref = friends_ref.child(user.uid);
    const onFriendsChange = ref.on("value", (snapshot) => {
      let res = snapshot.val() ? Object.keys(snapshot.val()) : [];

      res = res.filter((uid) => uid !== user.uid);

      setFriends(res);
    });

    return () => ref.off("value", onFriendsChange);
  }, [friends_ref, user]);

  return friends;
}

export function useUserList(): string[] | null {
  const [users, setUsers] = useState<string[]>([]);
  const { user } = useUserStore();
  const users_ref = useDBRef("/users");

  useEffect(() => {
    if (!user) {
      setUsers([]);
      return;
    }

    const refUsers = users_ref.on("value", (snapshot) => {
      let res = snapshot.val() ? Object.keys(snapshot.val()) : [];

      res = res.filter((uid) => uid !== user.uid);

      setUsers(res);
    });

    return () => users_ref.off("value", refUsers);
  }, [user, users_ref]);

  return users;
}

export function addFriend(uid: UserID) {
  const friends_ref = getDBRef(friends_path);
  const curr_uid = useUserStore.getState().user?.uid;

  return new Promise((resolve, reject) => {
    if (!curr_uid) {
      return resolve(false);
    }

    friends_ref.child(curr_uid).child(uid).set(true)
      .then(() => resolve(true))
      .catch((error) => reject(error));
  });
}

export function removeFriend(uid: UserID) {
  const friends_ref = getDBRef(friends_path);
  const curr_uid = useUserStore.getState().user?.uid;

  return new Promise((resolve, reject) => {
    if (!curr_uid) {
      return resolve(false);
    }

    friends_ref.child(curr_uid).child(uid).remove()
      .then(() => resolve(true))
      .catch((error) => reject(error));
  });
}

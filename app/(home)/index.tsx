import SwipeCore from "@/components/swipe/SwipeCore";
import { TView } from "@/components/theme/TView";
import { useFriendList, useUserList } from "@/logic/friendManager";
import { getUserData, UserData, useUserData } from "@/logic/userData";
import React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";



export default function Index() {

  const userData = useUserData();
  const users = useUserList();
  const friends = useFriendList();

  const [newUsersData, setNewUsersData] = useState<UserData[] | null>(null);

  useEffect(() => {
    if (friends === null || users === null) {
      return;
    }

    Promise.all(users.filter((uid) => !friends.includes(uid)).map((uid) => getUserData(uid))).then((results) => {
      setNewUsersData(results.filter((user) => user !== null) as UserData[]);
    });

    // Promise.all(friends.map((uid) => getUserData(uid))).then((results) => {
    //   setFriendsData(results.filter((user) => user !== null) as UserData[]);
    // });
  }, [friends, users]);

  useEffect(() => {
    console.log("New users data:", newUsersData?.length);
  }, [newUsersData]);

  return (
    <TView
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!userData || !newUsersData ? <ActivityIndicator size="large" /> :
        <>
          {/* <TText>Welcome back <TText style={{ color: "red", fontWeight: "bold" }}>{userData.name}</TText>!</TText> */}

          {/* <TRouterLink href={"/(home)/settings" as Href<string>}>Settings</TRouterLink>
          <TRouterLink href={"/(home)/profile/0" as Href<string>}>User profile</TRouterLink>

          {(friendsData.length > 0) &&
            <TView style={{ marginTop: 20, alignItems: "center" }}>
              <TText>Your friends:</TText>
              {friendsData.map((friend) => (
                <TText key={friend.uid}>{friend.name}</TText>
              ))}
            </TView>
          } */}

          <SwipeCore users={newUsersData!} />
        </>
      }
    </TView>
  );
}

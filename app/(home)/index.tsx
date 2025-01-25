import SwipeCore from "@/components/swipe/SwipeCore";
import { TView } from "@/components/theme/TView";
import { useFriendList } from "@/logic/friendManager";
import { getUserData, UserData, useUserData } from "@/logic/userData";
import React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";



export default function Index() {

  const userData = useUserData();
  const friends = useFriendList();

  const [friendsData, setFriendsData] = useState<UserData[]>([]);

  useEffect(() => {
    if (!friends) {
      setFriendsData([]);
      return;
    }

    Promise.all(friends.map((uid) => getUserData(uid))).then((results) => {
      setFriendsData(results.filter((user) => user !== null) as UserData[]);
    });
  }, [friends]);

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
      {!userData ? <ActivityIndicator size="large" /> :
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

          <SwipeCore />
        </>
      }
    </TView>
  );
}

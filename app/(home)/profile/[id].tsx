import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import { TRouterLink } from "@/components/theme/TRouterLink";
import React, { useEffect, useState, useRef } from "react";
import { Text, View, FlatList } from "react-native";
import styles from "@/constants/ProfileStyles";
import { useRoute } from "@react-navigation/native";
import { Href } from "expo-router";
import UserProfileButton from "@/components/own_profile/Button";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import TBlurImage from "@/components/theme/TBlurImage";
import { getUserRef, getUserImage, getUserBlurImage, getUserData, UserData } from "@/logic/userData";
import TButton from "@/components/theme/TButton";
import { addFriend, removeFriend, useFriendList, useUserList } from "@/logic/friendManager";
import auth from "@react-native-firebase/auth";
import { BaseImage, BaseBlurImage } from "@/constants/BaseImage";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function UserView() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [userData, setUserData] = useState<any>(null);

  const users = useUserList();
  const friends = useFriendList();

  const [usersData, setUsersData] = useState<UserData[]>([]);
  const visitedProfiles = useRef<string[]>([]);

  useEffect(() => {
    if (!users) {
      setUsersData([]);
      return;
    }

    Promise.all(users.map((uid) => getUserData(uid))).then((results) => {
      setUsersData(results.filter((user) => user !== null) as UserData[]);
    });
  }, [users]);

  const [image, setImage] = useState<string | null>(null);
  const [blurImage, setBlurImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        let userImage: string | null = null;
        let userBlurImage: string | null = null;

        if (!id || id === "") {
          userImage = await getUserImage();
          userBlurImage = await getUserBlurImage();
        } else {
          userImage = await getUserImage(id);
          userBlurImage = await getUserBlurImage(id);
        }

        setImage(userImage);
        setBlurImage(userBlurImage);

        if (userImage === null) {
          setImage(BaseImage);
          setBlurImage(BaseBlurImage);
        }

      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    };

    fetchUserImages();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      let userRef;

      if (!id || id === "") {
        userRef = getUserRef();
      } else {
        userRef = getUserRef(id);
      }

      try {
        const snapshot = await userRef.once("value");
        setUserData(snapshot.val());
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [id]);


  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (<ParallaxScrollView
    headerImage={
      <TView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TBlurImage
          source={image ? { uri: image } : undefined}
          width={224}
          height={224}
          borderRadius={12}
          blurhash={blurImage ? blurImage : ""}
          containerStyle={{ margin: 10, elevation: 6 }}
        />
      </TView>
    }
    headerBackgroundColor={{ light: "#ffffff", dark: "#333333" }}
  >
    
    {visitedProfiles.current.length > 0 && (
        <TRouterLink 
          href={`/(home)/profile/${visitedProfiles.current[visitedProfiles.current.length - 1]}` as Href<string>} 
          style={{ 
            position: "absolute",
            top: 0,
            right: 28,  
          }}
          onPress={() => {
            visitedProfiles.current.pop();
          }}>
            <Ionicons 
              name="arrow-back-circle" 
              size={34} 
              style={{ 
             }} />
        </TRouterLink>
    )}

    <TText type="title">{userData.name}</TText>
    <TText>{userData?.description || ""}</TText>

    {id && id !== auth().currentUser!.uid ? (
      friends && friends.includes(id) ? (
        <UserProfileButton
          title="Remove from friends"
          onPress={() => removeFriend(id)}
        />
      ) : (
        <UserProfileButton
          title="Add to friends"
          onPress={() => addFriend(id)}
        />
      )
    ) : (
      <TText style={{ textAlign: "center", fontWeight: "bold", fontSize: 14 }}>It's your profile!</TText>
    )}

    <TText type="subtitle">Friends</TText>
    <FlatList
      data={usersData.filter((user) => user.uid !== id)}
      renderItem={({ item }) => (
        <TView style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 6,
          width: "100%",
          backgroundColor: "#dcecf2",
          marginVertical: 6,
          borderRadius: 12,
          elevation: 3,
          alignItems: "center"
        }}>
          <TRouterLink 
            href={`/(home)/profile/${item.uid}` as Href<string>} 
            style={{ flex: 1, paddingTop: 4 }}
            onPress={() => {
              if (visitedProfiles.current.length == 0) {
                visitedProfiles.current.push(auth().currentUser!.uid)
              }
              if (id && id !== visitedProfiles.current[visitedProfiles.current.length - 1]) {
                visitedProfiles.current.push(id);
              }
            }}>

            <TBlurImage
              source={item.image ? { uri: item.image } : { uri: BaseImage }}
              width={64}
              height={64}
              borderRadius={4}
              blurhash={item.blurImage || BaseBlurImage}
              containerStyle={{ elevation: 2 }}
            />
            <Text style={{ color: "black", fontSize: 15 }}>
              {item.name || "Unknown User"}
            </Text>

          </TRouterLink>

          {friends && friends.includes(item.uid) ? (
            <TButton
              title={"Remove\n  friend"}
              style={{ minWidth: 80 }}
              onPress={() => removeFriend(item.uid)}
            />
          ) : (
            <TButton
              title={" Add\nfriend"}
              style={{ minWidth: 80 }}
              onPress={() => addFriend(item.uid)}
            />
          )}
        </TView>
      )}
      keyExtractor={(item) => item.uid}
      scrollEnabled={false}
    />

  </ParallaxScrollView>
  );

}
import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import { TRouterLink } from "@/components/theme/TRouterLink";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import styles from '@/constants/ProfileStyles'
import { useRoute } from '@react-navigation/native';
import { Href } from "expo-router";
import UserProfileButton from '@/components/own_profile/Button'
import ParallaxScrollView from "@/components/ParallaxScrollView"
import TBlurImage from "@/components/theme/TBlurImage";
import { getUserRef,getUserImage, getUserBlurImage, getUserData, UserData } from "@/logic/userData";
import TButton from "@/components/theme/TButton";
import { addFriend, removeFriend, useFriendList, useUserList } from "@/logic/friendManager";
import { BaseImage } from "@/constants/BaseImage";


export default function UserView() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [userData, setUserData] = useState<any>(null);

  const users = useUserList();
  const friends = useFriendList();

  const [usersData, setUsersData] = useState<UserData[]>([]);
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
      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    };
  
    fetchUserImages();
  }, [id])

  useEffect(() => {
    const fetchUserData = () => {
      let userRef;
  
      if (!id || id === "") {
        userRef = getUserRef();
      } else {
        userRef = getUserRef(id); 
      }
  
      const onDataChange = userRef.on("value", (snapshot) => {
        setUserData(snapshot.val());
      });
  
      return () => {
        userRef.off("value", onDataChange);
      };
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
  
  return ( <ParallaxScrollView
    headerImage={
        <TView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TBlurImage
            source={image ? { uri: image } : undefined}
            width={224}
            height={224}
            borderRadius={12}
            blurhash={blurImage? blurImage : ""}
            containerStyle={{ margin: 10, elevation: 6 }} 
          />
        </TView>
    }
    headerBackgroundColor={{ light: "#ffffff", dark: "#333333" }}
  >
      <TText type="title">{userData.name}</TText>
      <TText>{userData?.description || ""}</TText>

      <UserProfileButton 
        title={false ? "Remove from friends" : "Add to friends"}
        // TODO: recreate this mock to something working
        onPress={() => {}}
      />

      <TText type="subtitle">Friends</TText>
      <FlatList
        data={usersData.filter((user) => user.uid !== id)} 
        renderItem={({ item }) => (
          <TView style={styles.friendBox}>           
            <TRouterLink href={`/(home)/profile/${item.uid}` as Href<string>}>
              <TBlurImage
                source={item.image ? { uri: item.image } : undefined}
                width={64}
                height={64}
                borderRadius={4}
                blurhash={item.blurImage || ""}
                containerStyle={{ margin: 3, elevation: 2 }}
              />
              {item.name || "Unknown User"}
            </TRouterLink>
            
            {friends && friends.includes(item.uid) ? (
              <TButton
                title="Remove friend"
                onPress={() => removeFriend(item.uid)}
              />
            ) : (
              <TButton
                title="Add friend"
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
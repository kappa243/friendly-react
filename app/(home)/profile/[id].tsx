import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import { TRouterLink } from "@/components/theme/TRouterLink";
import React from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import styles from '@/constants/ProfileStyles'
import { useRoute } from '@react-navigation/native';
import { Href } from "expo-router";
import UserProfileButton from '@/components/own_profile/Button'
import { Link, LinkProps } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { friends } from "@/components/own_profile/UserModel"


export default function UserView() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const character = friends.find((friend) => friend.id === id);

  if (!character) {
    return (
      <View style={styles.container}>
        <Text>Character not found</Text>
      </View>
    );
  }
  
  // const profile_view = (
  //   <TView style={styles.container}>
  //     <TText type="title">{character.username}</TText>

  //     <TView style={styles.userBox}>
  //       <Image source={{ uri: character.photo }} style={styles.image} />
  //       <TText>{character.description}</TText>
  //     </TView>

  //     <UserProfileButton 
  //           title='Add to friends'
  //           onPress={() => (true)}
  //     />

  //     <TText type="subtitle">Friends</TText>
  //     <FlatList
  //       style={styles.friendsList}
  //       data={friends.filter((friend) => friend.id !== id)}
  //       renderItem={({ item }) => (
  //         <TView style={styles.friendBox}>
  //           <Image style={styles.friendPhoto} source={{ uri: item.photo }}  />
  //           <TRouterLink style={styles.friendUserName} href={`/(home)/profile/${item.id}` as Href<string>}>
  //             {item.username}
  //           </TRouterLink>
  //         </TView>
  //       )}
  //       keyExtractor={(item) => item.id}
  //     />

  //   </TView>
  // )

  return ( <ParallaxScrollView
    headerImage={
      <Image
        source={{ uri: character.photo }}
        style={styles.image}
        resizeMode="cover"
      />
    }
    headerBackgroundColor={{ light: "#ffffff", dark: "#333333" }}
  >
      <TText type="title">{character.username}</TText>
      <TText>{character.description}</TText>
      <UserProfileButton 
            title='Add to friends'
            onPress={() => (true)}
      />

      <TText type="subtitle">Friends</TText>
      <FlatList
        style={styles.friendsList}
        data={friends.filter((friend) => friend.id !== id)}
        renderItem={({ item }) => (
          <TView style={styles.friendBox}>
            <Image style={styles.friendPhoto} source={{ uri: item.photo }}  />
            <TRouterLink style={styles.friendUserName} href={`/(home)/profile/${item.id}` as Href<string>}>
              {item.username}
            </TRouterLink>
          </TView>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} 
      />

  </ParallaxScrollView>
  ); 

 
}
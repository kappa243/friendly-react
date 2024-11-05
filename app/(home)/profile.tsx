import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import React from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import styles from '@/constants/ProfileStyles'

type Friend = {
  id: string;
  username: string;
  photo: string;
};


// mock friends list
const friends: Friend[] = [
  { id: "1", username: "Jon Snow", photo: "https://fwcdn.pl/cpo/08/54/854/1014.4.jpg" },
  { id: "2", username: "Daenerys Targaryen", photo: "https://fwcdn.pl/cpo/08/50/850/1012.4.jpg" },
  { id: "3", username: "Tyrion Lannister", photo: "https://fwcdn.pl/fcp/68/48/476848/13003.1.jpg" },
  { id: "4", username: "Samwell Tarly", photo: "https://fwcdn.pl/cpo/10/10/1010/1233.4.jpg" },
  { id: "5", username: "Davos Seaworth", photo: "https://fwcdn.pl/cpo/10/48/1048/1300.4.jpg" },
];

export default function UserView() {
  const renderFriendsList = ({ item }: { item: Friend }) => (
    <View style={styles.friendBox}>
      <Image
        source={{ uri: item.photo }}
        style={styles.friendPhoto}
      />
      <Text style={styles.friendUserName}>{item.username}</Text>
    </View>
  );

  return (
    <TView style={styles.container}>
      <TText type="title">
        Arya Stark
      </TText>

      <TView style={styles.userBox}>
        <Image
          source={{ uri: "https://fwcdn.pl/fcp/68/48/476848/12529.1.jpg" }}
          style={styles.image}
        />

        <TText>
          I am a fictional character in American author George R. R. Martin's
          A Song of Ice and Fire epic fantasy novel series and its HBO television adaptation Game of Thrones.
          I am tomboyish, headstrong, feisty, independent, disdain traditional female pursuits.
        </TText>

      </TView>

      <TText type="subtitle">Friends</TText>
      <FlatList style={styles.friendsList}
        data={friends}
        renderItem={renderFriendsList}
        keyExtractor={(item) => item.id}
      />

    </TView>
  );
}
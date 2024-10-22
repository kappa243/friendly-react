import React from 'react';
import { Button, Text, View, Image, FlatList, StyleSheet } from 'react-native';

type Friend = {
    id: string;
    username: string;
    photo: string;
  };  


// mock friends list
const friends: Friend[] = [
    { id: '1', username: 'Jon Snow', photo: 'https://fwcdn.pl/cpo/08/54/854/1014.4.jpg' },
    { id: '2', username: 'Daenerys Targaryen', photo: 'https://fwcdn.pl/cpo/08/50/850/1012.4.jpg' },
    { id: '3', username: 'Tyrion Lannister', photo: 'https://fwcdn.pl/fcp/68/48/476848/13003.1.jpg' },
    { id: '4', username: 'Samwell Tarly', photo: 'https://fwcdn.pl/cpo/10/10/1010/1233.4.jpg' },
    { id: '5', username: 'Davos Seaworth', photo: 'https://fwcdn.pl/cpo/10/48/1048/1300.4.jpg' },
  ];
  
export  function UserView() {
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
      <View style={styles.container}>
        <Text style={styles.header}>User</Text>
        
        <View style={styles.userBox}>
        <Image
          source={{ uri: 'https://fwcdn.pl/fcp/68/48/476848/12529.1.jpg' }}
          style={styles.image}
        />

        <Text style={styles.userName}>
            Arya Stark
        </Text>


        <Text style={styles.userDescription}>
        I am a fictional character in American author George R. R. Martin's 
        A Song of Ice and Fire epic fantasy novel series and its HBO television adaptation Game of Thrones.
        I am tomboyish, headstrong, feisty, independent, disdain traditional female pursuits.
        </Text>

        </View>

        <Text style={styles.header}>Friends</Text>
        <FlatList style={styles.friendsList}
          data={friends}
          renderItem={renderFriendsList}
          keyExtractor={(item) => item.id}
        />
  
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#76706b',
    },

    userBox: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
    },

    image: {
      width: 180,
      height: 180,
      marginBottom: 20,
      borderRadius: 12,
      elevation: 3,
    },

    userName: {
        fontSize: 32,
        marginBottom: 6,
        color: '#2f2c2a',
        fontWeight: 'bold',
    },

    userDescription: {
        color: '#2f2c2a',
        marginBottom: 20,
    },

    friendBox: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#ece0d7',
      marginVertical: 8,
      borderRadius: 12,
      margin: 6,
      elevation: 3,
      alignItems: 'center',
    },

    friendUserName: {
      fontSize: 18,
    },

    friendPhoto: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 6,
        elevation: 3,
    },

    friendsList: {
        flex: 1,
        width: '100%',
    }
  });
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import styles from '@/constants/ProfileStyles'
import UserProfileButton from '@/components/own_profile/Button'


export function OwnProfileView() {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [userName, setUserName] = useState('Arya Stark');
  const [userDescription, setUserDescription] = useState(
    `I am a fictional character in American author George R. R. Martin's\
 A Song of Ice and Fire epic fantasy novel series and its HBO television adaptation Game of Thrones.\
 I am tomboyish, headstrong, feisty, independent, disdain traditional female pursuits.`
  );

  const [imageUri, setImageUri] = useState('https://fwcdn.pl/fcp/68/48/476848/12529.1.jpg');

  const saveChanges = (field) => {
    if (field === 'photo') setIsEditingPhoto(false);
    if (field === 'name') setIsEditingName(false);
    if (field === 'description') setIsEditingDescription(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User profile management</Text>
      
      <View style={styles.userBox}>

        {/* TODO: editing photo url needs to be replaced with uploading photo from gallery*/}
        <View style={inputStyles.editableColumn}>
          {isEditingPhoto ? (
            <TextInput
              value={imageUri}
              onChangeText={setImageUri}
              style={inputStyles.input}
              placeholder="Enter image URL"
            />
          ) : (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
          <UserProfileButton 
            title={isEditingPhoto ? 'Save' : 'Change photo'}
            onPress={() => (isEditingPhoto ? saveChanges('photo') : setIsEditingPhoto(true))}
          />
        </View>

        <View style={inputStyles.editableColumn}>
          {isEditingName ? (
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={[inputStyles.input, styles.userName, inputStyles.usernameInput]}
              placeholder="Enter user name"
            />
          ) : (
            <Text style={styles.userName}>{userName}</Text>
          )}
          <UserProfileButton 
            title={isEditingName ? 'Save' : 'Change name'}
            onPress={() => (isEditingName ? saveChanges('name') : setIsEditingName(true))}
          />
        </View>

        <View style={inputStyles.editableColumn}>
          {isEditingDescription ? (
            <TextInput
              value={userDescription}
              onChangeText={setUserDescription}
              style={[inputStyles.input, styles.userDescription]}
              placeholder="Enter description"
              multiline
            />
          ) : (
            <Text style={styles.userDescription}>{userDescription}</Text>
          )}
          <UserProfileButton 
            title={isEditingDescription ? 'Save' : 'Change description'}
            onPress={() => (isEditingDescription ? saveChanges('description') : setIsEditingDescription(true))}
          />
        </View>

      </View>
    </View>
  );
}

const inputStyles = StyleSheet.create({
  editableRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10,
  },

  editableColumn: { 
    flexDirection: 'column',
    alignItems: 'center', 
    marginVertical: 5, 
  },

  userProfileButton: { 
    backgroundColor: 'red', 
    paddingHorizontal: 5, 
    margin: 2, 
  },

  input: {
    borderBottomWidth: 1, 
  },

  usernameInput: {
    textAlign: 'center', 
  },

});

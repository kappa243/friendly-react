import React, { useState } from 'react';
import { TextInput, Image, StyleSheet } from 'react-native';
import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import styles from '@/constants/ProfileStyles'
import UserProfileButton from '@/components/own_profile/Button'


export default function OwnProfileView() {
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

  const saveChanges = (field: any) => {
    if (field === 'photo') setIsEditingPhoto(false);
    if (field === 'name') setIsEditingName(false);
    if (field === 'description') setIsEditingDescription(false);
  };

  return (
    <TView style={styles.container}>    
      <TView style={styles.userBox}>

        {/* TODO: editing photo url needs to be replaced with uploading photo from gallery*/}
        <TView style={inputStyles.editableColumn}>
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
        </TView>

        <TView style={inputStyles.editableColumn}>
          {isEditingName ? (
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={[inputStyles.input, styles.userName, inputStyles.usernameInput]}
              placeholder="Enter user name"
            />
          ) : (
            <TText  type="title">{userName}</TText>
          )}
          <UserProfileButton 
            title={isEditingName ? 'Save' : 'Change name'}
            onPress={() => (isEditingName ? saveChanges('name') : setIsEditingName(true))}
          />
        </TView>

        <TView style={inputStyles.editableColumn}>
          {isEditingDescription ? (
            <TextInput
              value={userDescription}
              onChangeText={setUserDescription}
              style={[inputStyles.input, styles.userDescription]}
              placeholder="Enter description"
              multiline
            />
          ) : (
            <TText>{userDescription}</TText>
          )}
          <UserProfileButton 
            title={isEditingDescription ? 'Save' : 'Change description'}
            onPress={() => (isEditingDescription ? saveChanges('description') : setIsEditingDescription(true))}
          />
        </TView>

      </TView>
    </TView>
  );
}

const inputStyles = StyleSheet.create({
  editableColumn: { 
    flexDirection: 'column',
    alignItems: 'center', 
  },

  userProfileButton: { 
    paddingHorizontal: 5, 
    margin: 2, 
  },

  input: {
    borderBottomWidth: 1, 
    fontSize: 16,
    lineHeight: 24,
  },

  usernameInput: {
    textAlign: 'center', 
  },

});

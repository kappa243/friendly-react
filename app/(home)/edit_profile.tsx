import React, { useState } from 'react';
import { TextInput, Image, StyleSheet } from 'react-native';
import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import styles from '@/constants/ProfileStyles'
import UserProfileButton from '@/components/own_profile/Button'
import TTextInput from "@/components/theme/TTextInput"
import { friends } from "@/components/own_profile/UserModel"
import ParallaxScrollView from '@/components/ParallaxScrollView';


export default function OwnProfileView() {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const user_profile = friends[0]
  const [userName, setUserName] = useState(user_profile.username);
  const [userDescription, setUserDescription] = useState(user_profile.description);
  const [imageUri, setImageUri] = useState(user_profile.photo);

  const saveChanges = (field: any) => {
    if (field === 'photo') setIsEditingPhoto(false);
    if (field === 'name') setIsEditingName(false);
    if (field === 'description') setIsEditingDescription(false);
  };

  return (
    <ParallaxScrollView 
      headerImage={
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      }
      headerBackgroundColor={{ light: "#ffffff", dark: "#333333" }}
    >
      {/* TODO: editing photo url needs to be replaced with uploading photo from gallery*/}
      <TView style={inputStyles.editableColumn}>
        {isEditingPhoto ? (
          <TTextInput
            value={imageUri}
            onChangeText={setImageUri}
            style={inputStyles.input}
            placeholder="Enter image URL"
            multiline
          />
        ):null}
        <UserProfileButton 
          title={isEditingPhoto ? 'Save' : 'Change photo'}
          onPress={() => (isEditingPhoto ? saveChanges('photo') : setIsEditingPhoto(true))}
        />
      </TView>

      <TView style={inputStyles.editableColumn}>
        {isEditingName ? (
          <TTextInput
            value={userName}
            onChangeText={setUserName}
            style={[inputStyles.usernameInput]}
            placeholder="Enter user name"
            multiline //TODO: is there a better way to show as text, not as password?
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
          <TTextInput
            value={userDescription}
            onChangeText={setUserDescription}
            style={[inputStyles.input]}
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

    </ParallaxScrollView>
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
    fontSize: 16,
    lineHeight: 24,
    height: 'auto',
  },

  usernameInput: {
    height: 'auto',
    textAlign: 'center', 
    fontSize: 32,
    marginBottom: 6,
    padding: 10,
    fontWeight: 'bold',
  },

});

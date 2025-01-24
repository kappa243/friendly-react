/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import UserProfileButton from "@/components/own_profile/Button";
import TTextInput from "@/components/theme/TTextInput";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { setUserBlurImage, setUserImage, useUserData, useUserBlurImage, useUserImage, setUserName, setUserDescription, setUserEmail } from "@/logic/userData";
import TBlurImage from "@/components/theme/TBlurImage";
import { useLockingFunction } from "@/hooks/useLockingHandle";
import { convertImageAsset } from "@/logic/imageProcessor";
import * as ImagePicker from "expo-image-picker";
import { signOut } from "@/logic/auth";


export default function OwnProfileView() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const userData = useUserData();

  const [inputUserName, setInputUserName] = useState("");
  const [inputUserDescription, setInputUserDescription] = useState("");
  const [inputUserEmail, setInputUserEmail] = useState("");

  const image = useUserImage();
  const blurImage = useUserBlurImage();
  const { action, loading } = useLockingFunction();

  useEffect(() => {
    if (userData?.name) {
      setInputUserName(userData.name);
    }
    if (userData?.description) {
      setInputUserDescription(userData.description);
    }
    if (userData?.email) {
      setInputUserEmail(userData.email);
    }
  }, [userData]);

  const handleSetImage = useCallback(() => {
    action(async () => {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!res.canceled) {
        convertImageAsset(res.assets[0].uri).then((imageData) => {
          setUserImage(imageData.image);
          setUserBlurImage(imageData.blurImage);
        });
      }
    });
  }, [action]);


  const handleSaveName = async () => {
    try {
      if (inputUserName === userData?.name) {
        alert("Name remain unchanged");
      }
      else {
        await setUserName(inputUserName);
        alert("Name updated successfully");
      }
      setIsEditingName(false);
    } catch (error) {
      alert("Failed to update name");
    }
  };

  const handleSaveDescription = async () => {
    try {
      if (inputUserDescription === userData?.description) {
        alert("Description remain unchanged");
      }
      else {
        await setUserDescription(inputUserDescription);
        alert("Description updated successfully");
      }
      setIsEditingDescription(false);
    } catch (error) {
      alert("Failed to update description");
    }
  };

  const handleSaveEmail = async () => {
    try {
      if (inputUserEmail === userData?.email) {
        alert("Email remain unchanged");
      }
      else {
        await setUserEmail(inputUserEmail);
        alert("Email updated successfully");
      }
      setIsEditingEmail(false);
    } catch (error) {
      alert("Failed to update email");
    }
  };


  return (
    <ParallaxScrollView
      headerImage={
        <TView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TBlurImage
            source={image ? { uri: image } : undefined} // undefined is used to prevent the image from being displayed until it is loaded
            width={224}
            height={224}
            borderRadius={12}
            blurhash={blurImage} // currecntly only blurhash change forces the image to reload
            containerStyle={{ margin: 10, elevation: 6 }} //, borderColor: tintColor, borderWidth: 2 }}
          />
        </TView>
      }
      headerBackgroundColor={{ light: "#ffffff", dark: "#333333" }}
    >
      <TView style={inputStyles.editableColumn}>
        <UserProfileButton
          title='Change photo'
          onPress={() => !loading && handleSetImage()}
        />

      </TView>

      <TView style={inputStyles.editableColumn}>
        {isEditingName ? (
          <TTextInput
            value={inputUserName}
            onChangeText={setInputUserName}
            style={[inputStyles.usernameInput]}
            placeholder="Enter user name"
            multiline // is there a better way to show as text, not as password?
          />
        ) : (
          <TText style={{ margin: 10 }} type="title">{inputUserName}</TText>
        )}
        <UserProfileButton
          title={isEditingName ? "Save" : "Change name"}
          onPress={() => (isEditingName ? handleSaveName() : setIsEditingName(true))}
        />
      </TView>

      <TView style={inputStyles.editableColumn}>
        {isEditingDescription ? (
          <TTextInput
            value={inputUserDescription}
            onChangeText={setInputUserDescription}
            style={[inputStyles.input]}
            placeholder="Enter description"
            multiline
          />
        ) : (
          <TText>{inputUserDescription}</TText>
        )}
        <UserProfileButton
          title={isEditingDescription ? "Save" : "Change description"}
          onPress={() => (isEditingDescription ? handleSaveDescription() : setIsEditingDescription(true))}
        />
      </TView>

      <TView style={inputStyles.editableColumn}>
        {isEditingEmail ? (
          <TTextInput
            value={inputUserEmail}
            onChangeText={setInputUserEmail}
            style={[inputStyles.input]}
            placeholder="Enter email"
            multiline
          />
        ) : (
          <TText>{inputUserEmail}</TText>
        )}
        <UserProfileButton
          title={isEditingEmail ? "Save" : "Change email"}
          onPress={() => (isEditingEmail ? handleSaveEmail() : setIsEditingEmail(true))}
        />
      </TView>

      <UserProfileButton title="Sign out" onPress={signOut} />

    </ParallaxScrollView>
  );
}

const inputStyles = StyleSheet.create({
  editableColumn: {
    flexDirection: "column",
    alignItems: "center",
  },

  userProfileButton: {
    paddingHorizontal: 5,
    margin: 2,
  },

  input: {
    fontSize: 16,
    lineHeight: 24,
    height: "auto",
  },

  usernameInput: {
    height: "auto",
    textAlign: "center",
    fontSize: 32,
    marginBottom: 6,
    padding: 10,
    fontWeight: "bold",
  },

});

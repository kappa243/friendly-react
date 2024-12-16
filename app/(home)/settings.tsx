import TBlurImage from "@/components/theme/TBlurImage";
import TButton from "@/components/theme/TButton";
import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import { useLockingFunction } from "@/hooks/useLockingHandle";
import { useThemeColor } from "@/hooks/useThemeColor";
import { signOut } from "@/logic/auth";
import { addFriend, removeFriend, useFriendList, useUserList } from "@/logic/friendManager";
import { convertImageAsset } from "@/logic/imageProcessor";
import { getUserData, setUserBlurImage, setUserImage, UserData, useUserBlurImage, useUserImage } from "@/logic/userData";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";


export default function Settings() {

  const blurImage = useUserBlurImage();
  const image = useUserImage();

  const { action, loading } = useLockingFunction();

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

  const tintColor = useThemeColor({}, "tint");

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


  return (
    <TView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <TBlurImage
        source={image ? { uri: image } : undefined} // undefined is used to prevent the image from being displayed until it is loaded
        width={256}
        height={256}
        borderRadius={256}
        blurhash={blurImage} // currecntly only blurhash change forces the image to reload
        containerStyle={{ margin: 10, borderColor: tintColor, borderWidth: 2 }}
      />

      <TButton style={{ margin: 10 }} title="Change avatar" onPress={() => !loading && handleSetImage()} />
      <TButton style={{ margin: 10 }} title="Sign out" onPress={signOut} />

      <ScrollView style={{ width: "100%", margin: 20, }} contentContainerStyle={{ alignItems: "center" }}>
        {(usersData && usersData.length > 0) ? usersData.map((user) => (
          <TView key={user.uid} style={{ margin: 2, marginTop: 4, width: "100%", flexDirection: "column", alignItems: "center" }}>
            <TText>
              {user.name}
            </TText>
            {/* if user in friends add "remove friend button" otherwise "add friend button" */}
            {friends && friends.includes(user.uid) ?
              <TButton title="Remove friend" onPress={() => action(() => removeFriend(user.uid))} /> :
              <TButton title="Add friend" onPress={() => action(() => addFriend(user.uid))} />
            }
          </TView>
        )) :
          <ActivityIndicator size="large" />}
      </ScrollView>

    </TView>
  );
}

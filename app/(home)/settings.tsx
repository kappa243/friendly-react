import TBlurImage from "@/components/theme/TBlurImage";
import TButton from "@/components/theme/TButton";
import { TView } from "@/components/theme/TView";
import { useLockingFunction } from "@/hooks/useLockingHandle";
import { useThemeColor } from "@/hooks/useThemeColor";
import { signOut } from "@/logic/auth";
import { convertImageAsset } from "@/logic/imageProcessor";
import { setUserBlurImage, setUserImage, useUserBlurImage, useUserImage } from "@/logic/userData";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";

export default function Settings() {

  const blurImage = useUserBlurImage();
  const image = useUserImage();

  const { action, loading } = useLockingFunction();

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
        convertImageAsset(res.assets[0]).then((imageData) => {
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

      <TButton title="Change avatar" onPress={() => !loading && handleSetImage()} />
      <TButton title="Sign out" onPress={signOut} />

    </TView>
  );
}




import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase } from "@/logic/database";
import { BaseBlurImage, BaseImage } from "@/constants/BaseImage";

const db = getDatabase();

function getUserRef(user: FirebaseAuthTypes.User | null = auth().currentUser) {
  return db.ref("/users/" + user?.uid);
}

function setUserData(data: Record<string, unknown>) {
  return getUserRef().update(data);
}

export function setUserName(name: string) {
  return setUserData({ name: name });
}

export function setUserEmail(email: string) {
  return setUserData({ email: email });
}

export function setUserImage(image: string) {
  return setUserData({ image: image });
}

export function setUserBlurImage(blurImage: string) {
  return setUserData({ blurImage: blurImage });
}

export type UserData = {
  name: string;
  email: string;
}

export async function getCurrentUserData(): Promise<UserData | null> {
  const snapshot = await getUserRef().once("value");
  return snapshot.val();
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const ref = getUserRef();
    const onDataChange = ref.on("value", (snapshot) => {
      setUserData(snapshot.val());
    });

    return () => ref.off("value", onDataChange);
  }, []);

  return userData;
}

export async function getUserImage(user: FirebaseAuthTypes.User | null) {
  const snapshot = await getUserRef(user).child("image").once("value");
  return snapshot.val();
}

export async function getUserBlurImage(user: FirebaseAuthTypes.User | null) {
  const snapshot = await getUserRef(user).child("blurImage").once("value");
  return snapshot.val();
}

export function useUserImage(): string {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const refImage = getUserRef().child("image");
    const onImageChange = refImage.on("value", (snapshot) => {
      if (snapshot.val() === null) {
        setImage(BaseImage);
        return;
      }

      setImage(snapshot.val());
    });

    return () => refImage.off("value", onImageChange);
  }, []);

  return image!;
}

export function useUserBlurImage(): string {
  const [blurImage, setBlurImage] = useState<string | null>("");

  useEffect(() => {
    const refBlurImage = getUserRef().child("blurImage");
    const onBlurImageChange = refBlurImage.on("value", (snapshot) => {
      if (snapshot.val() === null) {
        setBlurImage(BaseBlurImage);
        return;
      }

      setBlurImage(snapshot.val());
    });

    return () => refBlurImage.off("value", onBlurImageChange);
  }, []);

  return blurImage!;
}
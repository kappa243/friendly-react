import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase } from "@/logic/database";

const db = getDatabase();

function setUserData(user: FirebaseAuthTypes.User | null, data: Record<string, unknown>) {
  return db.ref("/users/" + user?.uid).update(data);
}

export function setUserName(name: string) {
  return setUserData(auth().currentUser, { name: name });
}

export function setUserEmail(email: string) {
  return setUserData(auth().currentUser, { email: email });
}

export function setUserImage(image: string) {
  return setUserData(auth().currentUser, { image: image });
}

export function setUserBlurImage(blurImage: string) {
  return setUserData(auth().currentUser, { blurImage: blurImage });
}

export type UserData = {
  name: string;
  email: string;
}

// export function getUserData(user: FirebaseAuthTypes.User | null) {
//   return db.ref("users/" + user?.uid)
// }

export async function getCurrentUserData(): Promise<UserData | null> {
  const snapshot = await db.ref("/users/" + auth().currentUser?.uid).once("value");
  return snapshot.val();
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const ref = db.ref("/users/" + auth().currentUser?.uid);
    const onDataChange = ref.on("value", (snapshot) => {
      setUserData(snapshot.val());
    });

    return () => ref.off("value", onDataChange);
  }, []);

  return userData;
}


export async function getUserImage(user: FirebaseAuthTypes.User | null) {
  const snapshot = await db.ref("users/" + user?.uid).once("value");
  return snapshot.val().image;
}

export async function getUserBlurImage(user: FirebaseAuthTypes.User | null) {
  const snapshot = await db.ref("users/" + user?.uid).once("value");
  return snapshot.val().blurImage;
}


export function useUserImage(): string {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const refImage = db.ref("/users/" + auth().currentUser?.uid + "/image");
    const onImageChange = refImage.on("value", (snapshot) => {
      setImage(snapshot.val());
    });

    return () => refImage.off("value", onImageChange);
  }, []);

  return image!;
}

export function useUserBlurImage(): string {
  const [blurImage, setBlurImage] = useState<string | null>("");

  useEffect(() => {
    const refBlurImage = db.ref("/users/" + auth().currentUser?.uid + "/blurImage");
    const onBlurImageChange = refBlurImage.on("value", (snapshot) => {
      setBlurImage(snapshot.val());
    });

    return () => refBlurImage.off("value", onBlurImageChange);
  }, []);

  return blurImage!;
}
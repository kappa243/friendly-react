import { useEffect, useState } from "react";
import { getDBRef, useDBRef } from "@/logic/database";
import { BaseBlurImage, BaseImage } from "@/constants/BaseImage";
import { getUser, UserID } from "@/logic/userStore";

const users_path = "/users";

// usually used after user is logged in
export function getUserRef(uid?: UserID) {
  if (!uid) {
    uid = getUser().uid;
  }

  return getDBRef(`${users_path}/${uid}`);
}

export function useUserRef(uid?: UserID) {
  if (!uid) {
    uid = getUser().uid;
  }

  return useDBRef(`${users_path}/${uid}`);
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

export function setUserDescription(description: string) {
  return setUserData({ description: description });
}

export function setUserBlurImage(blurImage: string) {
  return setUserData({ blurImage: blurImage });
}

export type UserData = {
  uid: UserID;
  name: string;
  email: string;
  description?: string;
  image?: string;
  blurImage?: string;
}

export async function getUserData(uid?: UserID): Promise<UserData | null> {
  const ref = getUserRef(uid);

  const snapshot = await ref.once("value");
  const res = snapshot.val();

  if (res)
    res.uid = snapshot.key!;

  return res;
}

export function useUserData(uid?: UserID) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const ref = useUserRef(uid);

  useEffect(() => {
    const onDataChange = ref.on("value", (snapshot) => {
      const res = snapshot.val();

      if (res)
        res.uid = snapshot.key!;

      setUserData(res);
    });

    return () => ref.off("value", onDataChange);
  }, [ref]);

  return userData;
}

export async function getUserImage(uid?: UserID): Promise<string | null> {
  const ref = getUserRef(uid);

  const snapshot = await ref.child("image").once("value");
  return snapshot.val();
}

export async function getUserBlurImage(uid?: UserID): Promise<string | null> {
  const ref = getUserRef(uid);

  const snapshot = await ref.child("blurImage").once("value");
  return snapshot.val();
}

export function useUserImage(uid?: UserID): string {
  const [image, setImage] = useState<string | null>(null);
  const ref = useUserRef(uid);

  useEffect(() => {
    const refImage = ref.child("image");
    const onImageChange = refImage.on("value", (snapshot) => {
      if (snapshot.val() === null) {
        setImage(BaseImage);
        return;
      }

      setImage(snapshot.val());
    });

    return () => refImage.off("value", onImageChange);
  }, [ref]);

  return image!;
}

export function useUserBlurImage(uid?: UserID): string {
  const [blurImage, setBlurImage] = useState<string | null>("");
  const ref = useUserRef(uid);

  useEffect(() => {
    const refBlurImage = ref.child("blurImage");
    const onBlurImageChange = refBlurImage.on("value", (snapshot) => {
      if (snapshot.val() === null) {
        setBlurImage(BaseBlurImage);
        return;
      }

      setBlurImage(snapshot.val());
    });

    return () => refBlurImage.off("value", onBlurImageChange);
  }, [ref]);

  return blurImage!;
}
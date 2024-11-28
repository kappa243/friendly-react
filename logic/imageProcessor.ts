
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Blurhash } from "react-native-blurhash";


export type ImageData = {
  image: string;
  blurImage: string;
};

const width = 256;
const height = 256;

export async function convertImageAsset(image: ImagePicker.ImagePickerAsset): Promise<ImageData> {
  if (!image) throw new Error("Invalid image!");

  const resized = await manipulateAsync(image.uri, [{ resize: { width, height } }], { compress: 1, format: SaveFormat.WEBP, base64: true });

  const base64 = "data:image/webp;base64," + resized.base64;
  const blurhash = await Blurhash.encode(base64!, 4, 4);

  return { image: base64, blurImage: blurhash };
}

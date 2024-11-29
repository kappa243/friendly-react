
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Blurhash } from "react-native-blurhash";


export type ImageData = {
  image: string;
  blurImage: string;
};

const width = 256;
const height = 256;

export async function convertImageAsset(imageUri: string): Promise<ImageData> {
  const resized = await manipulateAsync(imageUri, [{ resize: { width, height } }], { compress: 1, format: SaveFormat.JPEG, base64: true });

  const base64 = "data:image/jpeg;base64," + resized.base64;
  const blurhash = await Blurhash.encode(base64!, 4, 4);

  return { image: base64, blurImage: blurhash };
}

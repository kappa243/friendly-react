import { useFadeAnimation } from "@/hooks/useFadeInAnimation";
import { DimensionValue, Image, ImageProps, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Blurhash } from "react-native-blurhash";
import { useEffect, useState } from "react";
import Animated from "react-native-reanimated";

export type BlurImageProps = ImageProps & {
  blurhash: string;
  width: DimensionValue;
  height: DimensionValue;
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>,
  blurhashStyle?: StyleProp<ViewStyle>,
  fadeInDuration?: number;
  transitionDuration?: number;
};

const AnimatedBlurhash = Animated.createAnimatedComponent(Blurhash);
const AnimatedTView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

export function TBlurImage({
  blurhash,
  width,
  height,
  borderRadius,
  containerStyle,
  blurhashStyle,
  fadeInDuration = 125,
  transitionDuration = 250,
  source,
  ...imageProps
}: BlurImageProps) {

  const [fadedIn, opacity, startFadeIn, startFadeOut] = useFadeAnimation(transitionDuration);
  const [, blurOpacity, startBlurFadeIn, , isBlurAnimating] = useFadeAnimation(fadeInDuration);
  const imageDimensions: { width: DimensionValue, height: DimensionValue } = { width, height };

  const [ready, setReady] = useState(false);

  const [lastBlurhash, setLastBlurhash] = useState<string | null>(blurhash);
  const [lastImage, setLastImage] = useState<ImageSourcePropType | undefined>(source);


  useEffect(() => {
    if (blurhash !== lastBlurhash) {
      setLastBlurhash(blurhash);
      setReady(false);
      if (fadedIn) startFadeOut();
    }
  }, [blurhash, fadedIn, lastBlurhash, source, startFadeOut]);

  useEffect(() => {
    if (!fadedIn && (source !== lastImage)) {
      setLastImage(source);
    }
  }, [fadedIn, lastImage, source]);

  useEffect(() => {
    if (ready && !isBlurAnimating) {
      startFadeIn();
    }
  }, [ready, isBlurAnimating, startFadeIn]);


  return (
    <AnimatedTView style={[imageDimensions, { overflow: "hidden" }, { borderRadius }, containerStyle]}>

      <AnimatedTView style={blurOpacity}>
        <AnimatedBlurhash
          blurhash={blurhash}
          decodeAsync={false}
          style={[styles.blurhash, imageDimensions, imageProps.style, blurhashStyle]}
          onLoadEnd={() => {
            startBlurFadeIn();
          }}
        />
      </AnimatedTView>
      {lastImage && (
        <AnimatedImage
          {...imageProps}
          {...imageDimensions}
          source={lastImage}
          style={[imageDimensions, imageProps.style, opacity]}
          onLoad={e => {
            if (typeof imageProps.onLoad === "function") {
              imageProps.onLoad(e);
            }

            setReady(true);
          }}
        />
      )}
    </AnimatedTView>
  );
}

const styles = StyleSheet.create({
  blurhash: {
    position: "absolute",
    left: 0,
    top: 0,
  },
});

TBlurImage.displayName = "TBlurImage";

export default TBlurImage;

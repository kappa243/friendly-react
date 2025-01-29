import { useEffect, useState } from "react";
import Animated, { AnimatedStyle, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SwipeState } from "./SwipeCore";
import { StyleProp, View, ViewStyle } from "react-native";
import { UserData, useUserBlurImage, useUserImage } from "@/logic/userData";
import { TText } from "../theme/TText";
import TBlurImage from "../theme/TBlurImage";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SwipeCard({
  data,
  x = 0.0,
  state = "normal",
  style,
}: {
  data: UserData;
  x: number;
  state: SwipeState;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
}) {

  const translateX = useSharedValue<number>(0.0);
  const [swiped, setSwiped] = useState(false);
  const [color] = useState([Math.random() * 160, Math.random() * 160, Math.random() * 160]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: withSpring(translateX.value * 250, {
        mass: 1,
        damping: 90,
        stiffness: 50,
        overshootClamping: true,
      })
    },
    {
      rotate: withSpring(`${translateX.value * 0.2}rad`, {
        mass: 1,
        damping: 90,
        stiffness: 50,
        overshootClamping: true,
      })
    }],
  }));

  useEffect(() => {
    if (!swiped) {
      if (state === "swipe_left") {
        setSwiped(true);
        translateX.value = -2.25;
      } else if (state === "swipe_right") {
        setSwiped(true);
        translateX.value = 2.25;
      }
    }
  }, [state, swiped, translateX]);

  useEffect(() => {
    if (state === "normal" && !swiped) {
      translateX.value = x;
    }
  }, [x, state, translateX, swiped]);

  const blurImage = useUserBlurImage(data.uid);
  const image = useUserImage(data.uid);

  const tintColor = useThemeColor({}, "tint");

  return (
    <Animated.View style={[style, {
      width: "100%",
      height: "100%",
      position: "absolute",
      // random color
      backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    }, animatedStyle]}>
      <View style={{ height: "60%", width: "100%" }}>
        <TBlurImage
          source={image ? { uri: image } : undefined} // undefined is used to prevent the image from being displayed until it is loaded
          width={"100%"}
          height={"100%"}
          style={{ resizeMode: "contain" }}
          borderRadius={0}
          blurhash={blurImage} // currecntly only blurhash change forces the image to reload
          containerStyle={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={{ height: "40%", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <TText style={{
          fontSize: 24,
        }}>
          {data.name}
        </TText>
      </View>

    </Animated.View>
  );
}
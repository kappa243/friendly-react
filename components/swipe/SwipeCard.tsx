import { useEffect, useState } from "react";
import Animated, { AnimatedStyle, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SwipeState } from "./SwipeCore";
import { StyleProp, ViewStyle } from "react-native";
import { UserData } from "@/logic/userData";
import { TText } from "../theme/TText";

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
  const [color] = useState(`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`);

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

  return (
    <Animated.View style={[style, {
      width: "100%",
      height: "100%",
      position: "absolute",
      // random color
      backgroundColor: color,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }, animatedStyle]}>
      <TText>{data.name}</TText>
    </Animated.View>
  );
}
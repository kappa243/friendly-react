import { useCallback, useState } from "react";
import { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from "react-native-reanimated";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFadeAnimation(duration = 500): [boolean, any, (fadedInCallback?: () => void) => void, (fadedOutCallback?: () => void) => void, boolean] {
  const [isFadeIn, setIsFadeIn] = useState(false);
  const animatedOpacityValue = useSharedValue(0);
  const [isAnimating, toggleIsAnimating] = useState(false);

  const startFadeIn = useCallback((fadedInCallback?: () => void) => {
    if (!isFadeIn) {
      toggleIsAnimating(true);
      animatedOpacityValue.value = withTiming(1, {
        duration: duration,
        easing: Easing.in(Easing.ease),
      }, () => {
        runOnJS(setIsFadeIn)(true);
        runOnJS(toggleIsAnimating)(false);
        if (typeof fadedInCallback === "function") {
          fadedInCallback();
        }
      });
    }
  }, [isFadeIn, animatedOpacityValue, duration]);

  const startFadeOut = useCallback((fadedOutCallback?: () => void) => {
    if (isFadeIn) {
      toggleIsAnimating(true);
      animatedOpacityValue.value = withTiming(0, {
        duration: duration,
        easing: Easing.out(Easing.ease),
      }, () => {
        runOnJS(setIsFadeIn)(false);
        runOnJS(toggleIsAnimating)(false);
        if (typeof fadedOutCallback === "function") {
          fadedOutCallback();
        }
      });
    }
  }, [isFadeIn, animatedOpacityValue, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacityValue.value,
    };
  });

  return [
    isFadeIn,
    animatedStyle,
    startFadeIn,
    startFadeOut,
    isAnimating
  ];
}
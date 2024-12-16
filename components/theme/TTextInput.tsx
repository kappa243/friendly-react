import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


const ATextInput = Animated.createAnimatedComponent(TextInput);

export type TTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export const TTextInput = forwardRef<TextInput, TTextInputProps>(({
  style,
  lightColor,
  darkColor,
  autoCapitalize = "none",
  ...rest
}: TTextInputProps, outerRef) => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  const interRef = useRef<TextInput>(null);
  useImperativeHandle(outerRef, () => interRef.current!, []);

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "inputBackground");
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const placeholderTextColor = useThemeColor({ light: lightColor, dark: darkColor }, "placeholderText");
  const tint = useThemeColor({ light: lightColor, dark: darkColor }, "tint");

  const focused = useSharedValue(0);

  const borderColorStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        focused.value,
        [0, 1],
        [backgroundColor, tint]
      )
    };
  });

  const handleFocus = () => {
    focused.value = withTiming(1, { duration: animations.timing });
  };

  const handleBlur = () => {
    focused.value = withTiming(0, { duration: animations.timing });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const keyboardHideCallback = () => {
    interRef.current?.blur();
  };

  useEffect(() => {
    const keyboardHide = Keyboard.addListener("keyboardDidHide", keyboardHideCallback);

    return () => {
      keyboardHide.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ATextInput
        style={[
          styles.input,
          {
            backgroundColor: backgroundColor,
            color: textColor,
          },
          borderColorStyle,
          style,
        ]}
        placeholderTextColor={placeholderTextColor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize={autoCapitalize}
        ref={interRef}
        {...rest}
        secureTextEntry={rest.secureTextEntry && !passwordVisible}
        keyboardType={
          (rest.secureTextEntry && passwordVisible)
            ? "visible-password"
            : rest.keyboardType
        }
      />
      {rest.secureTextEntry && (
        <Pressable onPress={togglePasswordVisibility} style={styles.togglePasswordVisibility}>
          <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color={tint} />
        </Pressable>
      )}
    </View>
  );
});

const animations = {
  timing: 100
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  togglePasswordVisibility: {
    position: "absolute",
    right: 10
  }
});

TTextInput.displayName = "TTextInput";

export default TTextInput;
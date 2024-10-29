/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0e8db5";

const tintColorDark = "#11bef5";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    buttonText: "#fff",
    buttonBackground: tintColorLight,
    placeholderText: "#687076",
    inputBackground: "#ebebeb",
    icon: "#687076",
    tabIconDefault: "#687076",
    tint: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#323232",
    buttonText: "#323232",
    buttonBackground: tintColorDark,
    placeholderText: "#9BA1A6",
    inputBackground: "#464646",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tint: tintColorDark,
  },
};

import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, PressableProps, StyleProp, StyleSheet, TextStyle } from "react-native";
import { TText } from "./TText";

export type TButtonProps = PressableProps & {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  lightColor?: string;
  darkColor?: string;
};


export function TButton({ title, style, textStyle, lightColor, darkColor, ...rest }: TButtonProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, "buttonText");
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "buttonBackground");

  return (
    <Pressable
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      style={[
        styles.container,
        { backgroundColor },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        style
      ]}
      {...rest}
    >
      <TText
        style={[
          { color: textColor },
          textStyle
        ]}
      >
        {title}
      </TText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  }
});

TButton.displayName = "TButton";

export default TButton;
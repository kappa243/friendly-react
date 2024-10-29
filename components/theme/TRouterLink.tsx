import { useThemeColor } from "@/logic/useThemeColor";
import { StyleProp, TextStyle } from "react-native";
import { Link, LinkProps } from "expo-router";

export type TLinkProps = LinkProps<string> & {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  lightColor?: string;
  darkColor?: string;
};


export function TRouterLink({ children, style, lightColor, darkColor, ...rest }: TLinkProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, "tint");

  return (
    <Link
      style={[
        { color: textColor },
        style
      ]}
      {...rest}
    >
      {children}
    </Link>
  );

}

TRouterLink.displayName = "TRouterLink";

export default TRouterLink;
import TRouterLink from "@/components/theme/TRouterLink";
import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import { useUserData } from "@/logic/userData";
import { Href } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function Index() {

  const userData = useUserData();

  return (
    <TView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!userData ? <ActivityIndicator size="large" /> :
        <>
          <TText>Welcome back <TText style={{ color: "red", fontWeight: "bold" }}>{userData.name}</TText>!</TText>
          <TRouterLink href={"/(home)/test" as Href<string>}>Settings</TRouterLink>
          <TRouterLink href={"/(home)/profile" as Href<string>}>User profile</TRouterLink>
        </>
      }
    </TView>
  );
}

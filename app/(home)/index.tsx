import TRouterLink from "@/components/theme/TRouterLink";
import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import { useUserStore } from "@/logic/auth";
import { Href } from "expo-router";

export default function Index() {

  const { user } = useUserStore();

  return (
    <TView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TText>Welcome back <TText style={{ color: "red", fontWeight: "bold" }}>{user?.email}</TText>!</TText>
      <TRouterLink href={"/(home)/test" as Href<string>}>Settings</TRouterLink>
      <TRouterLink href={"/(home)/profile" as Href<string>}>User profile</TRouterLink>
    </TView>
  );
}

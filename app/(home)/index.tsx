import TRouterLink from "@/components/theme/TRouterLink";
import { TText } from "@/components/theme/TText";
import { TView } from "@/components/theme/TView";
import { useUserStore } from "@/logic/auth";

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
      <TRouterLink href="/(home)/test">Test</TRouterLink>
    </TView>
  );
}

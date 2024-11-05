import { TView } from "@/components/theme/TView";
import { ActivityIndicator } from "react-native";

export default function Index() {
  return (
    <TView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </TView>
  );
}

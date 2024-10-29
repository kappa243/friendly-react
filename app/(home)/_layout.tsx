import { HelloWave } from "@/components/HelloWave";
import { TText } from "@/components/theme/TText";
import { Stack } from "expo-router";

function HomeHeader() {
  return (
    <>
      <TText style={{ fontSize: 20, fontWeight: "bold" }}>Friendly</TText>
      <HelloWave />
    </>
  );
}

export default function Home() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitleAlign: "center",
        headerTitle() { return <HomeHeader />; },
      }} />
      <Stack.Screen name="test" />
    </Stack>
  );
}
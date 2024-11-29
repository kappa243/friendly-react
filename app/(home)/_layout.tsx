import { HelloWave } from "@/components/HelloWave";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { TText } from "@/components/theme/TText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import { View } from "react-native";

function HomeHeader() {
  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
      <TText style={{ fontSize: 20, fontWeight: "bold" }}>Friendly</TText>
      <HelloWave />
    </View>
  );
}

export default function Home() {

  const tint = useThemeColor({}, "tint");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        headerShown: true,
      }}
      backBehavior="initialRoute"
    >
      <Tabs.Screen name="settings" options={{
        title: "Settings",
        tabBarIcon: (({ focused, color }) => (
          <TabBarIcon name={focused ? "settings" : "settings-outline"} color={color} />
        ))
      }} />
      <Tabs.Screen name="index" options={{
        headerTitleAlign: "center",
        headerTitle: () => <HomeHeader />,
        tabBarIcon: (({ focused, color }) => (
          <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
        ))
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: (({ focused, color }) => (
          <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
        ))
      }} />

    </Tabs>
  );
}
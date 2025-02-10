import { HelloWave } from "@/components/HelloWave";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { TText } from "@/components/theme/TText";
import { useThemeColor } from "@/hooks/useThemeColor";
import {defaultLocation, LocationContext} from "@/components/LocationProvider";
import { Tabs } from "expo-router";
import { View } from "react-native";
import {useEffect, useState} from "react";
import {requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject} from "expo-location";
import {setUserLocation, useUserData} from "@/logic/userData";
import {useUserStore} from "@/logic/userStore";

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

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [location, setLocation] = useState<LocationObject>(defaultLocation);
  const userData = useUserData();
  const { user, setUser } = useUserStore();
  // get user location
  useEffect(() => {
    if(userData?.location) {
      setLocation(userData!.location);
    }

    async function getCurrentLocation() {

      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const curr_location = await getCurrentPositionAsync({});

      if(user && curr_location.coords.longitude !== location.coords.longitude && curr_location.coords.latitude !== location.coords.latitude){

        setLocation(curr_location);
        await setUserLocation(curr_location);
      }
    }

    const interval = setInterval(() => {
      getCurrentLocation();
    }, 500000);
    return () => {
      clearInterval(interval);

    };
  }, [location, user, userData]);
  return (
    <LocationContext.Provider value={location}>
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
        <Tabs.Screen
          name="profile/[id]"
          initialParams={{ id: "" }}
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="edit_profile" options={{
          title: "Edit Profile",
          tabBarIcon: (({ focused, color }) => (
            <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
          ))
        }} />
        <Tabs.Screen name="map" options={{
          title: "Map",
          tabBarIcon: (({ focused, color }) => (
            <TabBarIcon name={focused ? "location" : "location-outline"} color={color} />
          ))
        }} />
    
        {/* <Tabs.Screen name="motion" options={{
            title: "Motion test",
            tabBarIcon: (({ focused, color }) => (
              <TabBarIcon name={focused ? "settings" : "settings-outline"} color={color} />
            ))
          }}/> */}
    
      </Tabs>
    </LocationContext.Provider>  
  );
}
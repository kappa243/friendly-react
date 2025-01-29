import { subscribeAuthState } from "@/logic/auth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useUserStore } from "@/logic/userStore";
import {requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject} from "expo-location";
import {defaultLocation, LocationContext} from "@/components/LocationProvider";
import {setUserLocation, useUserData} from "@/logic/userData";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const sysColor = useThemeColor({}, "background");

  const { user, setUser } = useUserStore();
  const userData = useUserData();
  const [appReady, setAppReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  const router = useRouter();
  const segments = useSegments();
  const navState = useRootNavigationState();

  const [location, setLocation] = useState<LocationObject>(defaultLocation);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // load fonts
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // set background color of system UI (fixes problems with visible areas during screen transitions or keyboard open/close)
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(sysColor);
  }, [sysColor]);

  // subscribe to auth state
  useEffect(() => {
    const subscriber = subscribeAuthState((user) => {
      setUser(user);
      setAuthReady(true);
    });

    return () => subscriber();
  }, [setUser]);

  // setup resources
  useEffect(() => {
    if (!fontsLoaded || !navState.key || !authReady) return;

    // auth state redirect
    if (router.canDismiss()) router.dismissAll();

    if (!user) {
      router.replace("/(auth)/signIn");
    } else {
      router.replace("/(home)");
    }

  }, [user, navState.key, fontsLoaded, router, authReady]);

  // hide splash screen when app is ready
  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  // set app ready when auth state redirected to correct screen
  useEffect(() => {
    if (!appReady && segments[0]) {
      setAppReady(true);
    }
  }, [appReady, segments]);

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
      console.log(curr_location);
      if(user && curr_location.coords.longitude !== location.coords.longitude && curr_location.coords.latitude !== location.coords.latitude){
        console.log("send");
        setLocation(curr_location);
        await setUserLocation(curr_location);
      }
    }
    console.log("start location");
    const interval = setInterval(() => {
      getCurrentLocation();
    }, 5000);
    return () => {
      clearInterval(interval);
      console.log("stopped location");
    };
  }, [location]);
  if (!appReady) {
    return <Slot />;
  }

  return (
    <LocationContext.Provider value={location}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </LocationContext.Provider>
  );
}

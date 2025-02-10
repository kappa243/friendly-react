import { subscribeAuthState } from "@/logic/auth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useUserStore } from "@/logic/userStore";



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const sysColor = useThemeColor({}, "background");

  const { user, setUser } = useUserStore();

  const [appReady, setAppReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  const router = useRouter();
  const segments = useSegments();
  const navState = useRootNavigationState();

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


  if (!appReady) {
    return <Slot />;
  }

  return (

    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}

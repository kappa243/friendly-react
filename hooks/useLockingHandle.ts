import { useCallback, useState } from "react";
import { Alert, Keyboard } from "react-native";


export function useLockingFunction() {
  const [loading, setLoading] = useState(false);

  const handleAction = useCallback(async (action: () => Promise<unknown>) => {
    if (loading) return;

    setLoading(true);
    Keyboard.dismiss(); // removes autofill overlays

    try {
      await action();
    } catch (error) {
      const err = error as Error;
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return { loading, action: handleAction } as const;
}
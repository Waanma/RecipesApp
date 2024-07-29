import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="[id]"
          options={{ headerBackTitle: "Home", headerTitle: "Recipe" }}
        />
      </Stack>
    </SafeAreaView>
  );
}

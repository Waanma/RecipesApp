import { Link, Stack } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
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

import { Link, Stack } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerRight: () => (
            <Link href="/favorites" asChild>
              <Icon name="heart" size={30} color={"red"} />
            </Link>
          ),
        }}
      >
        <Stack.Screen
          name="[id]"
          options={{ headerBackTitle: "Home", headerTitle: "Recipe" }}
        />
      </Stack>
    </View>
  );
}

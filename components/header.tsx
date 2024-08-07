import { Text, ImageBackground, View, Pressable } from "react-native";
import { styled, useColorScheme } from "nativewind";
import SearchBar from "./searchBar";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import DarkModeButton from "./darkModeButton";

const StyledText = styled(Text);

const Header = () => {
  const { colorScheme } = useColorScheme();
  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg?cs=srgb&dl=pexels-goumbik-349609.jpg&fm=jpg",
      }}
      resizeMode="cover"
    >
      <View style={{ width: 410, height: 250 }}>
        <DarkModeButton />
        <View>
          <Text
            className={`${colorScheme === "dark" ? "text-black" : "text-white"} text-5xl tracking-wide py-1 ml-2`}
          >
            Learn once,{" "}
            <StyledText className="text-newYellow font-bold">cook</StyledText>{" "}
            everywhere!
          </Text>
          <View className="px-10 flex-row items-center justify-center gap-2">
            <View className="w-[85%]">
              <SearchBar />
            </View>
            <Link href={`/favorites`} asChild>
              <Pressable className="bg-white rounded-full p-1 border-2 active:opacity-80 active:scale-90">
                <Ionicons name="heart" size={30} color={"red"} />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Header;

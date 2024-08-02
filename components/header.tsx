import { Text, ImageBackground, View, Pressable } from "react-native";
import { styled } from "nativewind";
import SearchBar from "./searchBar";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const StyledText = styled(Text);

const Header = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg",
      }}
      resizeMode="cover"
    >
      <View style={{ width: 410, height: 200 }}>
        <Text className="text-white text-5xl tracking-wide py-1 ml-2">
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
    </ImageBackground>
  );
};

export default Header;

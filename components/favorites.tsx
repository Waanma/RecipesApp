import { View, Text, Image, FlatList } from "react-native";
import useMealStore from "../store/useMealStore";
import { useColorScheme } from "nativewind";

const Favorites = () => {
  const { favorites } = useMealStore();
  const { colorScheme } = useColorScheme();

  const textColor = () => {
    return colorScheme === "dark" ? "text-white" : "text-black";
  };

  const renderFavorite = ({ item }) => (
    <View
      className={`flex-row items-center p-4 border-b ${colorScheme === "dark" ? "border-white" : "border-gray-200"}`}
    >
      <Image
        source={{ uri: item.strMealThumb }}
        className="w-20 h-20 rounded"
        resizeMode="cover"
      />
      <View className="ml-4">
        <Text className={`text-lg font-bold ${textColor()}`}>
          {item.strMeal}
        </Text>
        <Text className={`${textColor()}`}>{item.strCategory}</Text>
      </View>
    </View>
  );

  return (
    <View
      className={`flex-1 w-full p-4 bg-orangeSoft pt-12 ${colorScheme === "dark" ? "bg-newBlack" : "bg-orangeSoft"}`}
    >
      <Text className={`text-2xl font-bold mb-4 ${textColor()}`}>
        Favorites
      </Text>
      {favorites.length === 0 ? (
        <Text className={`text-center text-gray-500 ${textColor()}`}>
          No favorites yet
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderFavorite}
        />
      )}
    </View>
  );
};

export default Favorites;

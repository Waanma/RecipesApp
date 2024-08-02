import { View, Text, Image, FlatList } from "react-native";
import useMealStore from "../store/useMealStore";

const Favorites = () => {
  const { favorites } = useMealStore();

  // Renderiza cada favorito
  const renderFavorite = ({ item }) => (
    <View className="flex-row items-center p-4 border-b border-gray-200">
      <Image
        source={{ uri: item.strMealThumb }}
        className="w-20 h-20 rounded"
        resizeMode="cover"
      />
      <View className="ml-4">
        <Text className="text-lg font-bold">{item.strMeal}</Text>
        <Text className="text-gray-600">{item.strCategory}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 w-full p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Favorites</Text>
      {favorites.length === 0 ? (
        <Text className="text-center text-gray-500">No favorites yet</Text>
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

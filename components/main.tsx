import { useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { AnimatedItem } from "./itemCard";
import useMealStore from "../store/useMealStore";
import Header from "./header";

const Main = () => {
  const { meals, loading, fetchMeals, fetchCategories, categories } =
    useMealStore();

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <ScrollView>
      <Header />
      <View
        style={{ backgroundColor: "#E98A15" }}
        className="-top-6 br rounded-tl-3xl rounded-tr-3xl px-5"
      >
        <View className="w-full flex-row py-3">
          <FlatList
            data={categories}
            keyExtractor={(item) => item.idCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  className={`flex-1 items-center px-2 py-2 text-white ${
                    item.strCategory === "All"
                      ? "border-r-2 border-secondary"
                      : ""
                  }`}
                >
                  <Image
                    source={{ uri: item.strCategoryThumb }}
                    width={80}
                    height={50}
                  />
                  <Text>{item.strCategory}</Text>
                </View>
              );
            }}
          />
        </View>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item, index }) => {
            return <AnimatedItem item={item} index={index} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Main;

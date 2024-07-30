import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Image,
  Animated,
  Pressable,
} from "react-native";
import { AnimatedItem } from "./itemCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import useMealStore from "../store/useMealStore";
import Header from "./header";
import useSearchStore from "../store/useSearchStore";

const Main = () => {
  const { searchText } = useSearchStore();
  const { meals, loading, fetchMeals, fetchCategories, categories } =
    useMealStore();
  const [filteredMeals, setFilteredMeals] = useState([]);

  //scrolls
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const handleFilterData = useCallback(() => {
    if (!searchText) {
      setFilteredMeals(meals);
      return;
    }

    const filtered = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMeals(filtered);
  }, [searchText, meals]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  useEffect(() => {
    handleFilterData();
  }, [searchText, meals, handleFilterData]);
  useEffect(() => {
    handleFilterData();
  }, [searchText, meals, handleFilterData]);
  // Loading
  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 230],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 280],
    outputRange: [0, -280],
    extrapolate: "clamp",
  });
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <View className="flex-1">
      <Animated.View
        style={{
          transform: [{ translateY: headerTranslateY }],
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          opacity: headerOpacity,
          zIndex: 15,
        }}
      >
        <Header />
        <View className="w-full px-5 flex-row bg-newOrange rounded-t-3xl -top-6">
          <FlatList
            data={categories}
            keyExtractor={(item) => item.idCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Pressable className="active:opacity-20 active:scale-90">
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
                </Pressable>
              );
            }}
          />
        </View>
      </Animated.View>
      <View className="flex-1">
        <Animated.ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={true}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          style={{ backgroundColor: "#E98A15", flex: 1 }}
          className="px-5 pb-5 pt-72"
        >
          <FlatList
            data={filteredMeals}
            keyExtractor={(item) => item.idMeal}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item, index }) => {
              return <AnimatedItem item={item} index={index} />;
            }}
          />
        </Animated.ScrollView>
        <Pressable
          className="active:opacity-70 absolute bottom-5 right-4 bg-newYellow w-14 h-14 rounded-full justify-center items-center"
          onPress={scrollToTop}
        >
          <View
            style={{ elevation: 5 }}
            className="active:opacity-70 absolute w-14 h-14 rounded-full justify-center items-center"
          >
            <Ionicons name="chevron-up" size={40} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Main;

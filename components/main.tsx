import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Image,
  Animated,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { AnimatedItem } from "./itemCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import useMealStore from "../store/useMealStore";
import Header from "./header";
import useSearchStore from "../store/useSearchStore";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const Main = () => {
  const { searchText } = useSearchStore();
  const { meals, loading, fetchMeals, fetchCategories, categories } =
    useMealStore();
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  //scrolls
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const handleFilterData = useCallback(() => {
    let filtered = meals;

    if (searchText) {
      filtered = filtered.filter((meal) =>
        meal.strMeal.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (meal) => meal.strCategory === selectedCategory
      );
    }

    setFilteredMeals(filtered);
  }, [searchText, meals, selectedCategory]);

  useEffect(() => {
    fetchMeals();
    fetchCategories();
  }, [fetchMeals, fetchCategories]);
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
  const handleCategoryPress =
    (category: string) => (event: GestureResponderEvent) => {
      setSelectedCategory(category);
    };

  return (
    <View className="flex-1 h-full">
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
        <View className="w-full px-5 flex-row bg-orangeSoft rounded-t-[25px] -top-6 items-center justify-center">
          <LinearGradient
            colors={["transparent", "#F18F01"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 100,
            }}
          />
          {selectedCategory === "All" ? null : (
            <Pressable
              className="active:opacity-20 active:scale-90"
              onPress={handleCategoryPress("All")}
            >
              <View style={{ width: 50, height: 50 }}>
                <Icon name="reply-all" size={50} color="black" />
              </View>
            </Pressable>
          )}

          <FlatList
            data={categories}
            keyExtractor={(item) => item.idCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Pressable
                  className="active:opacity-20 active:scale-90"
                  onPress={handleCategoryPress(item.strCategory)}
                >
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
          className="px-5 bg-orangeSoft"
        >
          {filteredMeals === undefined ? (
            <Text>Not found</Text>
          ) : (
            <FlatList
              data={filteredMeals}
              keyExtractor={(item) => item.idMeal}
              style={{ paddingTop: 290, paddingBottom: 30 }}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ item, index }) => {
                return <AnimatedItem item={item} index={index} />;
              }}
            />
          )}
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

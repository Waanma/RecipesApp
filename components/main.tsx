import { useEffect, useRef } from "react";
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
import useMealStore from "../store/useMealStore";
import Header from "./header";

const Main = () => {
  const { meals, loading, fetchMeals, fetchCategories, categories } =
    useMealStore();

  //scrolls
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Loading
  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -190],
    extrapolate: "clamp",
  });
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
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
      </Animated.View>
      <View className="flex-1">
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          style={{ backgroundColor: "#E98A15", flex: 1 }}
          className="px-5 pb-5 pt-72"
        >
          <FlatList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item, index }) => {
              return <AnimatedItem item={item} index={index} />;
            }}
          />
        </Animated.ScrollView>
        <Pressable className="absolute bottom-5 right-4 bg-newButton w-16 h-16 rounded-full justify-center items-center">
          <View>
            <Text>X</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Main;

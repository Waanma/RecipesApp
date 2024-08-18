import { create } from "zustand";
import mealApi from "../api/base.api";

type Meal = {
  strInstructions: string;
  strArea: string;
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strYoutube: string;
  strCategory: string;
};

type MealState = {
  favorites: Meal[];
  meals: Meal[];
  meal: Meal | null;
  categories: Category[];
  selectedCategory: string;
  loading: boolean;
  fetchMeals: () => Promise<void>;
  fetchMealById: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
  addFavorite: (meal: Meal) => void;
  removeFavorite: (id: string) => void;
};

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
const useMealStore = create<MealState>((set) => ({
  meals: [],
  meal: null,
  categories: [],
  favorites: [],
  loading: false,
  selectedCategory: "All",
  fetchMeals: async () => {
    set({ loading: true });
    try {
      const response = await mealApi.get("search.php?s=");
      set({ meals: response.data.meals || [], loading: false });
    } catch (err) {
      console.error("Error fetching meals: ", err);
    }
  },
  fetchMealById: async (id) => {
    set({ loading: true });
    try {
      const response = await mealApi.get(`lookup.php?i=${id}`);
      set({ meal: response.data.meals[0] || null, loading: false });
    } catch (err) {
      console.error("Error fetching meal: ", err);
    }
  },
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await mealApi.get("categories.php");
      set({ categories: response.data.categories || [], loading: false });
    } catch (err) {
      console.error("Error fetching meals by category: ", err);
    }
  },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  addFavorite: (meal) =>
    set((state) => ({
      favorites: [...state.favorites, meal],
    })),
  removeFavorite: (idMeal) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (meal: { idMeal: string }) => meal.idMeal !== idMeal,
      ),
    })),
}));

export default useMealStore;

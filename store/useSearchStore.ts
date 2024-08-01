import { create } from "zustand";

type searchState = {
  searchText: string;
  setSearchText: (text: string) => void;
};
const useSearchStore = create<searchState>((set) => ({
  searchText: "",
  setSearchText: (text) => set({ searchText: text }),
}));

export default useSearchStore;

import { Slot } from "expo-router";
import { SavedFoodsProvider } from "../context/SavedFoodsContext"; 

export default function Layout() {
  return (
    <SavedFoodsProvider>
      <Slot />
    </SavedFoodsProvider>
  );
}

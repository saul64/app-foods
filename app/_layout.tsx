import { Slot } from "expo-router";
import { SavedFoodsProvider } from "../context/SavedFoodsContext"; // Ajusta si tu ruta es diferente

export default function Layout() {
  return (
    <SavedFoodsProvider>
      <Slot />
    </SavedFoodsProvider>
  );
}
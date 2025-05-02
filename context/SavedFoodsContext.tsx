import { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "react-native";
import { Foods } from "../interfaces/food.supabase";

type SavedFoodsContextType = {
    savedFoods: Foods[];
    addFood: (food: Foods) => void;
    removeFood: (id: string) => void;
  };
  
const SavedFoodsContext = createContext<SavedFoodsContextType | null>(null);

export const SavedFoodsProvider = ({ children }: { children: ReactNode }) => {
  const [savedFoods, setSavedFoods] = useState<Foods[]>([]);

  const addFood = (food: Foods) => {
    setSavedFoods((prev) => {
      const exists = prev.some((f) => f.id === food.id);
      if (exists) {
        Alert.alert("Alimento duplicado", "Este alimento ya ha sido guardado.");
        return prev; 
      }
      return [...prev, food];
    });
  };
  

  const removeFood = (id: string) => {
    setSavedFoods((prev) => prev.filter((f) => f.id !== id));
  };
  

  return (
    <SavedFoodsContext.Provider value={{ savedFoods, addFood, removeFood }}>
      {children}
    </SavedFoodsContext.Provider>
  );
};

export const useSavedFoods = () => {
  const context = useContext(SavedFoodsContext);
  if (!context) {
    throw new Error("useSavedFoods debe usarse dentro de SavedFoodsProvider");
  }
  return context;
};

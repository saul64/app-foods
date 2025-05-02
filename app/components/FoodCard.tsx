import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Foods } from "../../interfaces/food.supabase"; 
import { useSavedFoods } from "../../context/SavedFoodsContext";

interface FoodCardProps {
  food: Foods;
}

export default function FoodCard({ food }: FoodCardProps) {
  const router = useRouter();
  const { addFood } = useSavedFoods();

  const handlePress = () => {
    router.push(`/food/${food.id}`); 
  };

  const handleSave = () => {
    addFood(food);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="bg-white border border-rose-200 rounded-2xl p-3 mb-4 shadow-md shadow-rose-100">
      <Text className="text-2xl font-bold text-rose-800">
        {food.alimento}
      </Text>
      <Text className="mt-2 text-rose-600">Categoría: {food.categoria}</Text>

      <TouchableOpacity onPress={handleSave} className="bg-rose-400 py-2 px-4 rounded-xl mt-1 self-start">
        <Text className="text-white font-medium text-base">Guardar</Text>
      </TouchableOpacity>

    </TouchableOpacity>
  );
}

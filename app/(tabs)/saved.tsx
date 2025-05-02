import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSavedFoods } from "../../context/SavedFoodsContext";

export default function Saved() {
  const { savedFoods, removeFood } = useSavedFoods();

  const handleRemoveFood = (id: string) => {
    removeFood(id);
  };

  return (
    <View className="flex-1 bg-pink-50 px-5 pt-6">
      <Text className="text-3xl font-bold text-pink-700 mb-5 text-center">Tus alimentos guardados</Text>

      {savedFoods.length > 0 ? (
        <FlatList
          data={savedFoods}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View className="bg-white py-4 px-5 mb-3 rounded-2xl shadow-md shadow-rose-100 border border-rose-200">
              <Text className="text-lg font-semibold text-rose-800">{item.alimento}</Text>
              <Text className="text-rose-600 mb-2">Categoría: {item.categoria}</Text>

              <TouchableOpacity
                onPress={() => handleRemoveFood(item.id)}
                className="bg-red-500 py-2 px-4 rounded-xl mt-1 self-start"
              >
                <Text className="text-white font-medium text-base">Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text className="text-center text-rose-500 text-base mt-10">
          No tienes alimentos guardados aún.
        </Text>
      )}
    </View>
  );
}

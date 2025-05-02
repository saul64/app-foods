import { useState, useEffect } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { Foods } from "../../interfaces/food.supabase";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";

export default function Search() {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error al obtener sesión:", sessionError.message);
        return;
      }

      if (sessionData?.session) {
        const token = sessionData.session.access_token;

        const { data, error } = await supabase
          .from("food")
          .select("*")
          .setHeader("Authorization", `Bearer ${token}`);

        if (error) {
          console.error("Error al obtener alimentos:", error);
          if (error.message.includes("401")) {
            Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente.");
          }
        } else {
          setFoods(data as Foods[]);
        }
      } else {
        Alert.alert("Error", "No se pudo obtener el token de usuario.");
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) =>
    food.alimento.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-pink-50 px-5 pt-6">
      <Text className="text-3xl font-bold text-pink-700 mb-5 text-center">
        Buscar alimentos
      </Text>

      <SearchBar
        placeHolder="Buscar..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredFoods.length > 0 ? (
        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FoodCard food={item} />}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        />
      ) : (
        <Text className="text-center text-rose-500 mt-10">
          No se encontraron alimentos.
        </Text>
      )}
    </View>
  );
}

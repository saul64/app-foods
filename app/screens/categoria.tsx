import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View, Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import FoodCard from "../components/FoodCard"; 
import { Foods } from "../../interfaces/food.supabase";

export default function CategoriaPage() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const [alimentos, setAlimentos] = useState<Foods[]>([]); 
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchAlimentos();
  }, []);

  const fetchAlimentos = async () => {
    // Obtener el token del usuario autenticado
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
    if (sessionError) {
      console.error("Error al obtener sesión:", sessionError.message);
      return;
    }
  
    if (sessionData && sessionData.session) {
      const token = sessionData.session.access_token;
  
     
      const { data, error } = await supabase
        .from("food")
        .select("*")
        .eq("categoria", categoria)
        .setHeader("Authorization", `Bearer ${token}`);
  
      if (error) {
        console.error("Error al obtener alimentos:", error);
        if (error.message.includes("401")) {
          Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente.");
         
          router.push("/login");
        }
      } else {
        setAlimentos(data ?? []);
      }
    } else {
      Alert.alert("Error", "No se pudo obtener el token de usuario.");
    }
  };

  const alimentosFiltrados = alimentos.filter((a) =>
    a.alimento.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-pink-50 px-5 pt-6">
      <Text className="text-3xl font-bold text-pink-700 mb-5 text-center">
        Alimentos de {categoria}
      </Text>

      <SearchBar 
        placeHolder="Buscar..." 
        value={search} 
        onChangeText={setSearch} 
      />

      {alimentosFiltrados.length > 0 ? (
        <FlatList
          data={alimentosFiltrados}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }} 
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FoodCard food={item} />}
        />
      ) : (
        <Text className="text-center text-rose-500 mt-10">
          No se encontraron alimentos en esta categoría.
        </Text>
      )}
    </View>
  );
}

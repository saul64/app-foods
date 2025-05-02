import { useEffect, useState } from "react";
import '@/app/global.css'
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Index() {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [dataError, setDataError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      // Obtener la sesión del usuario autenticado
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error al obtener sesión:", sessionError.message);
        return;
      }

      if (sessionData && sessionData.session) {
        // Si el usuario está autenticado, cargamos las categorías
        loadCategorias(sessionData.session.access_token);
      } else {
        // Si no hay sesión, redirigimos al login
        Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente.");
        router.push("/login");
      }
    };

    checkAuthAndLoad();
  }, []);

  const loadCategorias = async (token: string) => {
    // Agregar el token al header de la solicitud
    const { data, error } = await supabase
      .from("food")
      .select("categoria")
      .setHeader("Authorization", `Bearer ${token}`);

    if (error) {
      setDataError(error.message);
    } else {
      const unicas = Array.from(new Set(data.map((item) => item.categoria)));
      setCategorias(unicas);
    }

    setLoading(false);
  };

  const handleCategoriaPress = (categoria: string) => {
    router.push(`./screens/categoria?categoria=${categoria}`);
  };

  return (
    <View className="flex-1 bg-pink-50 px-5 pt-6">
      <Text className="text-3xl font-bold text-pink-700 mb-5 text-center">
        Tus alimentos por categoría
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#f472b6" />
      ) : categorias.length > 0 ? (
        <FlatList
          data={categorias}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategoriaPress(item)}
              className="bg-white py-4 px-5 mb-3 rounded-2xl shadow-md shadow-rose-100 border border-rose-200"
            >
              <Text className="text-lg text-rose-800 font-medium">{item}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text className="text-red-500 text-base">Error: {dataError}</Text>
      )}
    </View>
  );
}

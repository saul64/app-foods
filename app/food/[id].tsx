import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Foods } from "../../interfaces/food.supabase"; 

export default function FoodDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [food, setFood] = useState<Foods | null>(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const { data, error } = await supabase
        .from("food")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setFood(data as Foods);
      else if (error) console.error(error);
    };

    if (id) fetchFoodDetails();
  }, [id]);

  if (!food) return <Text className="text-center mt-10">Cargando...</Text>;

  return (
    <ScrollView className="flex-1 bg-pink-50 px-5 pt-6">
      <Text className="text-2xl font-bold text-rose-800 mb-2">
        {food.alimento}
      </Text>
      <Text className="text-lg text-rose-600 mb-4">
        Categoría: {food.categoria}
      </Text>

      {/* Datos generales */}
      <View className="mb-5">
        <Text className="text-xl font-semibold text-rose-700 mb-2">Información General</Text>
        <Text>Cantidad: {food.cantidad} {food.unidad}</Text>
        <Text>Peso bruto: {food.peso_bruto} g</Text>
        <Text>Peso neto: {food.peso_neto} g</Text>
      </View>

      {/* Información nutricional */}
      <View className="mb-5">
        <Text className="text-xl font-semibold text-rose-700 mb-2">Macronutrientes</Text>
        <Text>Kcal: {food.kcal}</Text>
        <Text>Proteína: {food.proteina} g</Text>
        <Text>Lípidos: {food.lipidos} g</Text>
        <Text>Carbohidratos: {food.carbohidratos} g</Text>
        <Text>Fibra: {food.fibra} g</Text>
        <Text>Azúcar: {food.azucar} g</Text>
      </View>

      {/* Grasas */}
      <View className="mb-5">
        <Text className="text-xl font-semibold text-rose-700 mb-2">Tipos de Grasas</Text>
        <Text>Grasa saturada: {food.grasa_saturada} g</Text>
        <Text>Grasa monoinsaturada: {food.grasa_monoinsaturada} g</Text>
        <Text>Grasa poliinsaturada: {food.grasa_poliinsaturada} g</Text>
        <Text>Colesterol: {food.colesterol} mg</Text>
      </View>

      {/* Vitaminas y minerales */}
      <View className="mb-5">
        <Text className="text-xl font-semibold text-rose-700 mb-2">Vitaminas y Minerales</Text>
        <Text>Vitamina A: {food.vitamina_a} µg</Text>
        <Text>Vitamina C: {food.vitamina_c} mg</Text>
        <Text>Ácido fólico: {food.acido_folico} µg</Text>
        <Text>Calcio: {food.calcio} mg</Text>
        <Text>Hierro: {food.hierro} mg</Text>
        <Text>Potasio: {food.potasio} mg</Text>
        <Text>Sodio: {food.sodio} mg</Text>
        <Text>Fósforo: {food.fosforo} mg</Text>
        <Text>Selenio: {food.selenio} µg</Text>
      </View>

      {/* Índices */}
      <View className="mb-10">
        <Text className="text-xl font-semibold text-rose-700 mb-2">Otros Datos</Text>
        <Text>Etanol: {food.etanol} g</Text>
        <Text>Índice Glucémico (IG): {food.IG}</Text>
        <Text>Carga Glucémica (IC): {food.IC}</Text>
      </View>
    </ScrollView>
  );
}

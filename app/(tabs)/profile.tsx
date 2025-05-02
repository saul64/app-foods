import { Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserEmail(data.user.email || "");
      }
    };
    getUserInfo();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <View className="flex-1 bg-pink-50 px-5 pt-6 items-center justify-center">
      <Text className="text-3xl font-bold text-pink-700 mb-5">Perfil</Text>


      <View className="bg-white w-full py-5 px-6 mb-6 rounded-2xl shadow-md shadow-rose-100 border border-rose-200">
        <Text className="text-lg text-rose-800 font-semibold mb-1">Correo electrónico:</Text>
        <Text className="text-rose-600">{userEmail}</Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 py-3 px-6 rounded-xl self-stretch"
      >
        <Text className="text-white text-center font-semibold text-base">Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

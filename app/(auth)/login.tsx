import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true); //Check components is mount
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error, email o password invalidos");
    } else {
      const jwtToken = data?.session?.access_token;
      if (jwtToken) {
        console.log("TOKEN JWT:", jwtToken)
        await AsyncStorage.setItem("jwtToken", jwtToken);
      }

      if (isMounted) {
        router.replace("/(tabs)");
      }
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</Text>

      <TextInput
        className="border p-2 mb-4 rounded"
        placeholder="Correo electrónico"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="border p-2 mb-4 rounded"
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-pink-600 p-3 rounded"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-center font-bold">
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text className="text-blue-600 mt-4 text-center">
          ¿Aún no tienes una cuenta? Regístrate
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
    }

    Alert.alert(
      'Registro exitoso',
      'Revisa tu correo para confirmar tu cuenta'
    );
    router.replace('/(auth)/login');
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">Registrarse</Text>

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
        onPress={handleRegister}
        disabled={loading}
      >
        <Text className="text-white text-center font-bold">
          {loading ? 'Cargando...' : 'Registrarse'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text className="text-blue-600 mt-4 text-center">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

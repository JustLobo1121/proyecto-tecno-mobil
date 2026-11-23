import { View, TextInput, Text, Pressable } from "react-native";
import { useState } from 'react'
import { useAuth } from "../context/AuthContext";

export default function LoginView() {
  const [user, setUser] = useState(String)
  const [password, setPassword] = useState(String)
  const { signIn } = useAuth();

  const handleDummyLogin = async () => {
    if (user.trim() !== "" && password.trim() !== "") {
      await signIn("token-dummy-123");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-slate-900 p-6">
      <Text className="text-3xl font-bold text-white mb-2">Ula Monitors</Text>
      <Text className="text-slate-400 mb-8 text-center">
        Inicia sesión para continuar
      </Text>
      <View className="w-full gap-4 mb-8">
        <View className="gap-1.5">
          <Text className="text-slate-300 text-sm font-medium ml-1">
            Usuario
          </Text>
          <TextInput
            placeholder="Ingresa tu usuario"
            placeholderTextColor="#94a3b8"
            onChangeText={setUser}
            className="w-full bg-slate-800 text-white px-4 py-3.5 rounded-xl border-2 border-slate-700 focus:border-blue-500"
          />
        </View>

        <View className="gap-1.5">
          <Text className="text-slate-300 text-sm font-medium ml-1">
            Contraseña
          </Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            onChangeText={setPassword}
            className="w-full bg-slate-800 text-white px-4 py-3.5 rounded-xl border-2 border-slate-700 focus:border-blue-500"
          />
        </View>
      </View>

      <Pressable
        onPress={handleDummyLogin}
        className="w-full bg-blue-600 py-4 rounded-xl items-center active:bg-blue-700"
      >
        <Text className="text-white font-semibold text-lg">
          Iniciar Sesión
        </Text>
      </Pressable>
    </View>
  );
}
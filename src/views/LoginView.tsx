import { View, TextInput, Text, Pressable } from "react-native";
import { useState } from 'react'
import { useAuth } from "../context/AuthContext";
import { apiFetch, TOKEN_KEY } from "@/api/client";
import * as SecureStore from 'expo-secure-store'

export default function LoginView() {
  const [user, setUser] = useState(String)
  const [password, setPassword] = useState(String)
  const [error, setError] = useState("")
  const { signIn } = useAuth();

  const handleLoginSucces = (request: any) => {
    SecureStore.setItem(TOKEN_KEY, request["access_token"])
  }

  const handleLogin = async () => {
  if (user.trim() === "" || password.trim() === "") return
  setError("")

  try {
    const data = await apiFetch("/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: user, password }).toString(),
    })

    SecureStore.setItem(TOKEN_KEY, data.access_token)
    await signIn(data.access_token)
  } catch (e: any) {
    setError(e.message)
  }
}

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
        onPress={handleLogin}
        className="w-full bg-blue-600 py-4 rounded-xl items-center active:bg-blue-700"
      >
        <Text className="text-white font-semibold text-lg">
          Iniciar Sesión
        </Text>
      </Pressable>
      {error !== "" && <Text className="text-red-400 mt-4">{error}</Text>}
    </View>
  );
}
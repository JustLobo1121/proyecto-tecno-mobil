import { View, Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-slate-900 p-4">
      <Text className="text-2xl font-bold text-white mb-6">
        Pantalla de Inicio
      </Text>
      <Pressable
        onPress={() => router.push("sensors")}
        className="bg-emerald-600 px-6 py-3 rounded-lg active:bg-emerald-700"
      >
        <Text className="text-white font-semibold">Ir a Perfil (Hook)</Text>
      </Pressable>
    </View>
  );
}
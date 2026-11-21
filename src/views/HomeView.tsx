import { View, Text, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeView() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-slate-900 p-6">
      <Text className="text-2xl font-bold text-white mb-6">
        Pantalla Principal
      </Text>

      <Pressable
        onPress={signOut}
        className="bg-red-600 px-6 py-3 rounded-xl active:bg-red-700"
      >
        <Text className="text-white font-semibold">Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}
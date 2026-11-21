import { View, Text, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginView() {
  const { signIn } = useAuth();

  const handleDummyLogin = async () => {
    await signIn("token-dummy-123");
  };

  return (
    <View className="flex-1 items-center justify-center bg-slate-900 p-6">
      <Text className="text-3xl font-bold text-white mb-2">Bienvenido</Text>
      <Text className="text-slate-400 mb-8 text-center">
        Inicia sesión para continuar
      </Text>

      <Pressable
        onPress={handleDummyLogin}
        className="w-full bg-blue-600 py-4 rounded-xl items-center active:bg-blue-700"
      >
        <Text className="text-white font-semibold text-lg">
          Iniciar Sesión (Dummy)
        </Text>
      </Pressable>
    </View>
  );
}
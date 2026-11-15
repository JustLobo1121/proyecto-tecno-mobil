// App.js
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-3xl font-bold text-blue-500">
        ¡Tailwind en React Native!
      </Text>
      <Text className="text-base text-gray-300 mt-4">
        Proyecto configurado con JSX y NativeWind.
      </Text>
    </View>
  );
}
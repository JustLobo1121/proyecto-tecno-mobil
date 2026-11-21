import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      <Stack.Screen name="sensors" options={{ title: "Sensores" }} />
    </Stack>
  );
}
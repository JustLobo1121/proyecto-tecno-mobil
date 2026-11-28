import { Stack } from "expo-router"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { ThemeProvider } from '@/context/ThemeContext'
import '../../global.css'

function RootNavigator() {
  const { session, isLoading } = useAuth()

  if (isLoading) return null

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

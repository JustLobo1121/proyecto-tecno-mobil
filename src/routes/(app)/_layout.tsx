import { Redirect, Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from '@/context/ThemeContext'
import Header from "@/components/Header"

export default function AppLayout() {
  const { session, isLoading } = useAuth()
  const { isDark } = useTheme()
  const insets = useSafeAreaInsets()

  if (isLoading) return null;
  if (!session) return <Redirect href="/login" />;
  return (
    <Tabs
      screenOptions={{
		header: ({ options, route }) => (
      		<Header title={(options.title as string) ?? route.name} />
    	),
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: isDark ? "#94a3b8" : "#64748b",
        tabBarStyle: {
          backgroundColor: isDark ? "#0f172a" : "#ffffff",
          borderTopColor: isDark ? "#1e293b" : "#e2e8f0",
          height: 70 + insets.bottom,
          paddingTop: 8,
          paddingBottom: 10 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Intervenciones",
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard-outline" color={color as string} size={28} />
          ),
        }}
      />
	  <Tabs.Screen
        name="sites"
        options={{
          title: "Centros",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons	 name="map-marker-outline" color={color as string} size={28} />
          ),
        }}
      />
    </Tabs>
  )
}
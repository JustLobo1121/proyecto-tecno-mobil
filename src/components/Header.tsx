import { useState } from "react"
import { View, Text, Pressable, Modal, Switch } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"

export default function Header({ title }: { title: string }) {
	const insets = useSafeAreaInsets()
	const { isDark, toggleTheme } = useTheme()
	const { signOut } = useAuth()
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<>
			<View
				style={{ paddingTop: insets.top + 8 }}
				className="flex-row items-center justify-between bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 px-4 pb-3 border-b border-slate-800"
			>
				<Text className="text-xl text-slate-900 dark:text-white font-bold">{title}</Text>

				<Pressable
					onPress={() => setMenuOpen(true)}
					hitSlop={10}
					className="w-10 h-10 rounded-full items-center justify-center active:bg-slate-700"
				>
					<Ionicons name="person-outline" size={20} color="#145ecb" />
				</Pressable>
			</View>

			<Modal
				visible={menuOpen}
				transparent
				animationType="fade"
				onRequestClose={() => setMenuOpen(false)}
			>
				<Pressable className="flex-1" onPress={() => setMenuOpen(false)}>
					<View className="absolute right-4 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
						<View className="flex-row items-center justify-between px-4 py-3">
							<View className="flex-row items-center gap-3">
								<Ionicons
									name={isDark ? "moon" : "sunny-outline"}
									size={20}
									color={isDark ? "#94a3b8" : "#f59e0b"}
								/>
								<Text className="text-slate-800 dark:text-slate-200 font-medium">Modo oscuro</Text>
							</View>
							<Switch value={isDark} onValueChange={toggleTheme} />
						</View>
						<View className="h-px bg-slate-200 dark:bg-slate-700" />
						<Pressable onPress={() => { setMenuOpen(false); signOut() }} className="flex-row items-center gap-3 px-4 py-3">
							<Ionicons name="log-out-outline" size={20} color="#f87171" />
							<Text className="text-red-400 font-medium">Cerrar sesión</Text>
						</Pressable>
					</View>
				</Pressable>
			</Modal>
		</>
	)
}
import { View, TextInput, Text, Pressable } from "react-native"
import { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import { apiFetch } from "@/api/client"
import { Ionicons } from "@expo/vector-icons"

export default function LoginView() {
	const [user, setUser] = useState(String)
	const [password, setPassword] = useState(String)
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [focused, setFocused] = useState(false)
	const { signIn } = useAuth();

	const handleLogin = async () => {
		if (user.trim() === "" || password.trim() === "") {
			setError("Ingresa tu usuario y contraseña")
			return
		}

		setError("")
		setLoading(true)

		try {
			const data = await apiFetch("/token", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams({ username: user.trim(), password }).toString(),
			})
			await signIn(data.access_token)
		} catch (e: any) {
			console.error("Error en login:", e)
			setError("Usuario o contraseña incorrectos")
		} finally {
			setLoading(false)
		}
	}

	return (
		<View className="flex-1 items-center justify-center p-6">
			<Text className="text-3xl font-bold mb-2">Ula Monitors</Text>
			<Text className="text-slate-600 mb-8 text-center">
				Inicia sesión para continuar
			</Text>
			{error !== "" && (
				<View className="w-full bg-red-500/10 border border-red-500/40 rounded-xl px-4 py-3 mb-4">
					<Text className="text-red-400 text-center">{error}</Text>
				</View>
			)}
			<View className="w-full gap-4 mb-8">
				<View className="gap-1.5">
					<Text className="text-slate-600 text-sm font-medium ml-1">
						Usuario
					</Text>
					<TextInput className={`w-full flex-row items-center rounded-xl border-2 px-4 py-3.5 ${focused ? "border-blue-500" : "border-slate-700"}`}
						placeholder="Ingresa tu usuario"
						placeholderTextColor="#94a3b8"
						autoCapitalize="none"
						autoCorrect={false}
						value={user}
						onChangeText={(t) => { setUser(t); setError("") }}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
					/>
				</View>

				<View className="gap-1.5">
					<Text className="text-slate-600 text-sm font-medium ml-1">
						Contraseña
					</Text>

					<View className={`w-full flex-row items-center rounded-xl border-2 ${focused ? "border-blue-500" : "border-slate-700"}`}>
						<TextInput
							placeholder="••••••••"
							placeholderTextColor="#222427"
							secureTextEntry={!showPassword}
							autoCapitalize="none"
							autoCorrect={false}
							value={password}
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							onChangeText={(t) => { setPassword(t); setError("") }}
							className="flex-1 px-4 py-3.5"
						/>

						<Pressable
							onPress={() => setShowPassword((v) => !v)}
							hitSlop={10}
							className="px-4"
						>
							<Ionicons
								name={showPassword ? "eye-off-outline" : "eye-outline"}
								size={22}
								color="#94a3b8"
							/>
						</Pressable>
					</View>
				</View>
			</View>

			<Pressable
				onPress={handleLogin}
				disabled={loading}
				className="w-full bg-blue-600 py-4 rounded-xl items-center active:bg-blue-700 disabled:opacity-60"
			>
				<Text className="text-white font-semibold text-lg">
					{loading ? "Ingresando..." : "Iniciar Sesión"}
				</Text>
			</Pressable>
		</View>
	);
}
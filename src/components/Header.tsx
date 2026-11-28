import { useState } from "react"
import { View, Text, Pressable, Modal } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "@/context/AuthContext"

export default function Header({ title }: { title: string }) {
  const insets = useSafeAreaInsets()
  const { signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <View
        style={{ paddingTop: insets.top + 8 }}
        className="flex-row items-center justify-between px-4 pb-3 border-b border-slate-800"
      >
        <Text className="text-xl font-bold">{title}</Text>

        <Pressable
          onPress={() => setMenuOpen(true)}
          hitSlop={10}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-slate-700"
        >
          <Ionicons name="person-outline" size={20} color="#1b1f25" />
        </Pressable>
      </View>

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable className="flex-1" onPress={() => setMenuOpen(false)}>
          <View
            style={{ marginTop: insets.top + 56 }}
            className="absolute right-4 w-48 border border-slate-700 rounded-xl overflow-hidden"
          >
            <Pressable
              onPress={() => {
                setMenuOpen(false)
                signOut()
              }}
              className="flex-row items-center gap-3 px-4 py-3 active:bg-slate-700"
            >
              <Ionicons name="log-out-outline" size={20} color="#f87171" />
              <Text className="text-red-400 font-medium">Cerrar sesión</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  )
}
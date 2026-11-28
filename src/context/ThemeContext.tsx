import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import { useColorScheme } from "nativewind"
import * as SecureStore from "expo-secure-store"

const THEME_KEY = "theme"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
    theme: Theme
    isDark: boolean
    setTheme: (t: Theme) => Promise<void>
    toggleTheme: () => Promise<void>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: PropsWithChildren) {
    const { colorScheme, setColorScheme } = useColorScheme()
    const [theme, setThemeState] = useState<Theme>("system")

    useEffect(() => {
        SecureStore.getItemAsync(THEME_KEY)
            .then((saved) => {
                if (saved === "light" || saved === "dark" || saved === "system") {
                    setThemeState(saved)
                    setColorScheme(saved)
                }
            })
            .catch(() => { })
    }, [])

    const setTheme = async (t: Theme) => {
        setThemeState(t)
        setColorScheme(t)
        await SecureStore.setItemAsync(THEME_KEY, t)
    }

    const isDark = colorScheme === "dark"
    const toggleTheme = () => setTheme(isDark ? "light" : "dark")

    return (
        <ThemeContext.Provider value={{ theme, isDark, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) throw new Error("useTheme debe usarse dentro de un ThemeProvider")
    return context
}
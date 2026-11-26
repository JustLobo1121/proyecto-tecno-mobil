import * as SecureStorage from 'expo-secure-store'
export const TOKEN_KEY = "token"
const baseURL = process.env.EXPO_PUBLIC_API_URL;
let onUnauthorized: (() => void) | null = null
export const setOnUnauthorized = (fn: () => void) => { onUnauthorized = fn }

export async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
    const token = SecureStorage.getItem(TOKEN_KEY)
    const headers = new Headers(options.headers)

    if (token) headers.set("Authorization", `Bearer ${token}`)

    const res = await fetch(`${baseURL}${path}`, { ...options, headers })
    
    if (res.status === 401 && token) {
        await SecureStorage.deleteItemAsync(TOKEN_KEY)
        onUnauthorized?.()
        throw new Error("Sesion expirada")
    }

    if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    let msg = "Error en la peticion"
    if (typeof body?.detail === "string") {
        msg = body.detail
    } else if (Array.isArray(body?.detail)) {
        msg = body.detail.map((d: any) => d.msg).join(", ")
    }
    throw new Error(msg)
}

    if (res.status === 204) return undefined as T

    return res.json()
}

export function toQuery(param: Record<string, string | number | boolean | null | undefined> = {}) {
    const query = new URLSearchParams()
    Object.entries(param).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") query.append(key, String(value))
    })
    const text = query.toString()
    return text ? `?${text}` : ""
}
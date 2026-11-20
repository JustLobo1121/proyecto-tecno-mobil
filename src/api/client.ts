declare global {
	interface ImportMeta {
		readonly env: {
			readonly VITE_API_URL: string;
		};
	}
}

const baseURL = import.meta.env.VITE_API_URL;
export const TOKEN_KEY = "token"

export async function apiFetch(path: any, options: RequestInit = {}) {
    const token = localStorage.getItem(TOKEN_KEY)
	const headers = new Headers(options.headers)

	if (token) headers.set("Authorization", `Bearer ${token}`)

    const res = await fetch(`${baseURL}${path}`, {...options, headers})

    if (res.status === 401 && token) {
        localStorage.removeItem(TOKEN_KEY)
        // ref to login
        throw new Error("Sesion expirada")
    }

    if (!res.ok) {
        const body = await res.json().catch(() => {})
        const msg = typeof body.detail === "string" ? body.detail: "Error en la peticion"
        throw new Error(msg)
    }

    return res.json()
}

export function toQuery(param: RequestInit = {}) {
    const query = new URLSearchParams()
    Object.entries(param).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") query.append(key,value) 
    })
    const text = query.toString()
    return text ? `?${text}` : "";
}
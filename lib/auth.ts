export interface AuthToken {
  id: string
  name: string
  email: string
  role: "SuperAdmin" | "Editor" | "Client" | "Guest"
  exp: number
}

const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

export const authService = {
  // Store token in localStorage
  setToken: (token: AuthToken) => {
    const withExpiry = {
      ...token,
      exp: Date.now() + TOKEN_EXPIRY,
    }
    localStorage.setItem("authToken", JSON.stringify(withExpiry))
  },

  // Retrieve and validate token
  getToken: (): AuthToken | null => {
    if (typeof window === "undefined") return null
    const tokenStr = localStorage.getItem("authToken")
    if (!tokenStr) return null

    try {
      const token = JSON.parse(tokenStr) as AuthToken
      if (token.exp && token.exp < Date.now()) {
        localStorage.removeItem("authToken")
        return null
      }
      return token
    } catch {
      return null
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return authService.getToken() !== null
  },

  // Check user role
  hasRole: (requiredRoles: string[]): boolean => {
    const token = authService.getToken()
    return token ? requiredRoles.includes(token.role) : false
  },

  // Logout and clear token
  logout: () => {
    localStorage.removeItem("authToken")
  },

  // Check if admin
  isAdmin: (): boolean => {
    const token = authService.getToken()
    return token ? ["SuperAdmin", "Editor"].includes(token.role) : false
  },

  // Check if client
  isClient: (): boolean => {
    const token = authService.getToken()
    return token?.role === "Client"
  },
}

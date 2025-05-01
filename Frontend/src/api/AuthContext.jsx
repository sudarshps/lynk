import { createContext, useContext, useEffect, useState } from "react";
import axiosApi from "./axiosApi.js";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axiosApi.get('/api/users/checkauth')
                setUser(res.data.user)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    const logout = async () => {
        await axiosApi.post('/api/users/logout')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user,setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)




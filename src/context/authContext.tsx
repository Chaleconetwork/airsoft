import { iAuthContext, iAuthProvider } from "@/interfaces/authTypes";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<iAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<iAuthProvider> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [data, setData] = useState<Record<string, string>>({});

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
        console.log(openModal)
    }, [openModal]);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setData({...data, [e.target.name]: e.target.value})
        console.log(data)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, openModal, handleOpenModal, handleChange, data }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
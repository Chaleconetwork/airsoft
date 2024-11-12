import { iAuthContext, iAuthProvider } from "@/interfaces/authTypes";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<iAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<iAuthProvider> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [data, setData] = useState<Record<string, string>>({});
    const [filter, setFilter] = useState<Record<string, string>>({});

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
        
    }, [openModalCreate, openModalUpdate]);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    const handleOpenModalCreate = () => {
        setOpenModalCreate(!openModalCreate)
    }
    
    const handleOpenModalUpdate = () => {
        setOpenModalUpdate(!openModalUpdate)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data)
    }

    function handleChangeFilter(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFilter({ ...filter, [e.target.name]: e.target.value })
        console.log(filter)
    }

    // function handleClickFilter(e: React.MouseEvent<HTMLElement>) {
    //     e.preventDefault()
    //     // setFilter((prev) => ({ ..);
    // }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, openModalCreate, openModalUpdate, handleOpenModalCreate, handleOpenModalUpdate, handleChange, data, handleChangeFilter, filter }}>
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

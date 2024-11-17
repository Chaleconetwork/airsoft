import { iAuthContext, iAuthProvider } from "@/interfaces/authTypes";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<iAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<iAuthProvider> = ({ children }) => {
    const [highlightActivate, setHighlightActivate] = useState<boolean | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [filter, setFilter] = useState<Record<string, string>>({});
    const [cleanInput, setCleanInput] = useState<boolean>(false);
    const [primaryKey, setPrimaryKey] = useState<string | number | null>(null);

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

    const handleCleanInput = () => {
        setCleanInput(!cleanInput)
    }

    const handleOpenModalCreate = () => {
        setOpenModalCreate(!openModalCreate)
    }

    const handleOpenModalUpdate = () => {
        setOpenModalUpdate(!openModalUpdate)
    }

    function handleChangeFilter(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    function handleCleanFilter(e: React.FormEvent) {
        setFilter({})
    }

    function handleHighlightActivate() {
        setHighlightActivate(!highlightActivate)
    }

    function handlePrimaryKey(pk: string | number) {
        setPrimaryKey(pk)
    }

    function handleCleanPrimaryKey() {
        setPrimaryKey(null)
    }

    return (
        <AuthContext.Provider value={
            {
                isAuthenticated,
                login,
                logout,
                openModalCreate,
                openModalUpdate,
                handleOpenModalCreate,
                handleOpenModalUpdate,
                handleChangeFilter,
                filter,
                handleCleanInput,
                handleCleanFilter,
                highlightActivate,
                handleHighlightActivate,
                primaryKey,
                handlePrimaryKey,
                handleCleanPrimaryKey
            }}>
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

import { createContext, useContext, useEffect, useState } from "react";
import { iAuthContext, iAuthProvider } from "@/interfaces/authTypes";

export const AuthContext = createContext<iAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<iAuthProvider> = ({ children }) => {
    const [highlightActivate, setHighlightActivate] = useState<boolean | null>(null);
    const [primaryKey, setPrimaryKey] = useState<string | number | null>(null);
    const [isResetedPassword, setIsResetedPassword] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [filter, setFilter] = useState<Record<string, string>>({});
    const [cleanInput, setCleanInput] = useState<boolean>(false);
    const [pagination, setPagination] = useState<number>(1);
    const [username, setUsername] = useState<string>('');
    const [rolename, setRolename] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const resetPasswordToken = localStorage.getItem('resetPasswordToken');
        if (token) {
            setIsAuthenticated(true);
        }

    }, [openModalCreate, openModalUpdate]);
    
    const resetPassword = (token: string) => {
        localStorage.setItem('resetPasswordToken', token);
        // setIsResetedPassword(true)
    };

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    const handleUsername = (username: string) => {
        setUsername(username)
    }

    const handleRolename = (rolename: string) => {
        setRolename(rolename)
    }

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

    function handleNextPage() {
        setPagination(pagination + 1)
    }

    function handlePreviousPage() {
        setPagination(pagination - 1)
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
                handleCleanPrimaryKey,
                handleNextPage,
                handlePreviousPage,
                pagination,
                handleUsername,
                username,
                handleRolename,
                rolename,
                resetPassword,
                isResetedPassword,
                setIsResetedPassword
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

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext'; 

const LoginComponent: React.FC = () => {
    const { isAuthenticated, login, logout } = useAuth();
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogin = () => {
        // Aquí puedes hacer una llamada a una API para obtener un token
        const token = 'sampleToken'; // Reemplaza esto con el token real
        login(token);
    };

    const handleLogout = () => {
        logout();
    };

    if (!isClient) {
        return null; // O cualquier otro contenido que quieras mostrar mientras se está montando
    }

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <p>Welcome back!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <p>Please log in</p>
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
};

export default LoginComponent;

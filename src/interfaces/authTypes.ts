import { ReactNode } from "react";

export interface iAuthContext {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    openModal: boolean;
    handleOpenModal: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    data: Record<string, string>;
}

export interface iAuthProvider {
    children: ReactNode;
}
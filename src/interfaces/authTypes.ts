import { ReactNode } from "react";

export interface iAuthContext {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export interface iAuthProvider {
    children: ReactNode;
}
import { ReactNode } from "react";

export interface iRole {
    roleName: string,
}

export interface iUser {
    // username: string;
    email?: string;
    password?: string;
}

export interface iAuthContext {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export interface iAuthProvider {
    children: ReactNode;
}
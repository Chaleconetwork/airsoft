import { ReactNode } from "react";

export interface iAuthContext {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    openModalCreate: boolean;
    openModalUpdate: boolean;
    handleOpenModalCreate: () => void;
    handleOpenModalUpdate: () => void;
    handleChangeFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    filter: Record<string, string>;
    handleCleanInput: () => void;
    handleCleanFilter: (e: React.FormEvent) => void;
    // handleClickFilter: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface iAuthProvider {
    children: ReactNode;
}
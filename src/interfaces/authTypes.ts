import { ReactNode } from "react";

export interface iAuthContext {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    openModalCreate: boolean;
    openModalUpdate: boolean;
    handleOpenModalCreate: () => void;
    handleOpenModalUpdate: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleChangeFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    data: Record<string, string>;
    filter: Record<string, string>;
    // handleClickFilter: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface iAuthProvider {
    children: ReactNode;
}
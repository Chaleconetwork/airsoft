import { ReactNode } from "react";

export interface iAuthContext {
    isAuthenticated: boolean;
    isResetedPassword: boolean;
    login: (token: string) => void;
    resetPassword: (token: string) => void;
    logout: () => void;
    openModalCreate: boolean;
    openModalUpdate: boolean;
    handleOpenModalCreate: () => void;
    handleOpenModalUpdate: () => void;
    handleChangeFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    filter: Record<string, string>;
    handleCleanInput: () => void;
    handleCleanFilter: (e: React.FormEvent) => void;
    highlightActivate: boolean | null;
    handleHighlightActivate: () => void;
    primaryKey: any;
    handlePrimaryKey: (pk: string | number) => void;
    handleCleanPrimaryKey: () => void;
    pagination: number;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    handleUsername: (username: string) => void;
    username: string
    handleRolename: (rolename: string) => void;
    rolename: string;
    // handleClickFilter: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface iAuthProvider {
    children: ReactNode;
}
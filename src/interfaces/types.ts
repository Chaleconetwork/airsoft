export interface iRole {
    roleName: string,
}

export interface iAuth {
    email: string;
    password: string;
}

export interface iUser {
    rut: string;
    email?: string;
    names?: string;
    surnames?: string;
    phone?: string;
    username?: string;
    roleName?: string;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
}

export interface iClient {
    rut: string;
    email?: string;
    names?: string;
    surnames?: string;
    phone?: string;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
}

export interface iSale {
    id: number;
    unitValue: number;
    amount: number;
    totalValue: number;
    username: string;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
}
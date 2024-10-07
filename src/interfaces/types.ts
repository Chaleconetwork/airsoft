export interface iRole {
    roleName: string,
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
    rut?: string;
    fullname?: string;
    email?: string;
    phone?: string;
    creationDate: string;
    createdBy: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
}

export interface iSale {
    id: number;
    unitValue: number;
    amount: number;
    totalValue: number;
    userId: string;
}
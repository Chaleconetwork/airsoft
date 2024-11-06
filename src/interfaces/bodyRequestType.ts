export interface iUserBodyRequest {
    rut: string;
    email?: string;
    names?: string;
    surnames?: string;
    phone?: string;
    username?: string;
    password?: string;
    roleId?: number;
    createdBy?: string;
    lastModificationBy?: string | null;
}

export interface iSaleBodyRequest {
    unitValue: number;
    amount: number;
    userId: string;
    createdBy: string;
    lastModificationBy?: string | null;
}
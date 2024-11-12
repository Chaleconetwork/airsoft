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

export interface iClientBodyRequest {
    rut: string;
    email?: string;
    names?: string;
    surnames?: string;
    phone?: string;
    createdBy?: string;
    lastModificationBy?: string | null;
}

export interface iPlayerBodyRequest {
    rut: string;
    email?: string;
    names?: string;
    surnames?: string;
    phone?: string;
    createdBy?: string;
    lastModificationBy?: string | null;
    banned: boolean;
}

export interface iSaleBodyRequest {
    id?: number | null;
    unitValue: number;
    amount: number;
    userId: string;
    rutCliente: string;
    createdBy: string;
    lastModificationBy?: string | null;
}

export interface iTeamBodyRequest {
    id?: number | null;
    teamName?: string;
    createdBy: string;
    lastModificationBy?: string | null;
}

export interface iFieldBodyRequest {
    fieldName: string;
    createdBy: string;
    lastModificationBy?: string | null;
}
export interface iUserBodyRequest {
    rut?: string | null;
    email?: string;
    names?: string;
    surnames?: string;
    phone?: string;
    username?: string;
    password?: string;
    roleId?: number;
    status?: boolean;
    createdBy?: string;
    lastModificationBy?: string | null;
}

export interface iClientBodyRequest {
    rut?: string | null;
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
    banned: boolean;
    createdBy?: string;
    lastModificationBy?: string | null;
}

export interface iSaleBodyRequest {
    id?: number | null;
    unitValue: number;
    amount: number;
    paymentMethodId: number;
    rutClient: string;
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
    id?: number | null;
    reservationDateInit?: string | null;
    reservationDateEnd?: string | null;
    createdBy: string;
    lastModificationBy?: string | null;
}

export interface iEventBodyRequest {
    id?: number | null;
    eventName: string;
    startDate: string;
    createdBy?: string;
    lastModificationBy?: string | null;
}

export interface iBillBodyRequest {
    id?: number | null;
    product: string;
    unitValue: number,
    amount: number;
    supplier: string;
    createdBy: string;
    lastModificationBy?: string | null;
}

export interface iPlayerGameBodyRequest {
    id?: number | null,
    playerRut: string;
    teamId: number;
    fieldId: number;
    createdBy: string;
    lastModificationBy?: string | null;
}
export interface iRole {
    roleName: string,
}

export interface iAuth {
    email: string;
    password?: string;
}

export interface iResetUserPassword {
    email: string;
    newPassword?: string;
    newPassword2?: string;
}

export interface iUser {
    rut: string;
    email?: string;
    names?: string;
    surnames?: string;
    phone?: string;
    username?: string;
    roleName?: string;
    status?: boolean;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
}

export interface iPlayer {
    rut: string;
    email?: string;
    names?: string;
    surnames?: string;
    phone?: string;
    banned?: boolean;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy?: string;
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

export interface iPaymentMethod {
    id: number;
    paymentMethodName: string;
}

export interface iSale {
    id: number;
    unitValue: number;
    amount: number;
    totalValue: number;
    paymentMethodName: number;
    rutClient: string;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy?: string;
}

export interface iTeam {
    id: number;
    teamName: string | string;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
}

export interface iField {
    id: number;
    reservationDateInit?: string | null;
    reservationDateEnd?: string | null;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy?: string;
}

export interface iEvent {
    id: number;
    eventName: string;
    startDate: string;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy?: string;
}

export interface iBill {
    id?: number;
    product: string;
    unitValue: number,
    amount: number;
    totalValue: number;
    supplier: string;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
}

export interface iPlayerGame {
    id?: number;
    playerRut: string;
    fieldId: number;
    teamId: number;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
}
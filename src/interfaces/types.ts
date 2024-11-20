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
    teamName: string;
    gameId: number;
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

export interface iSale {
    id: number;
    unitValue: number;
    amount: number;
    totalValue: number;
    paymentMethod: string;
    username: string;
    rutClient: string;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
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
    fieldName: string;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
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

export interface iGame {
    id?: number;
    fieldId: number;
    creationDate?: string;
    createdBy?: string;
    lastModificationDate?: string;
    lastModificationBy: string;
}
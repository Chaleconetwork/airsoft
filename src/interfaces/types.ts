export interface iRole {
    roleName: string,
}

export interface iUser {
    // username: string;
    email?: string;
    password?: string;
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
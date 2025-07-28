export interface User {
    name: string | null;
    id: number;
    pseudo: string | null;
    email: string;
    password: string;
    adresse: string | null;
    phone: string | null;
    status: boolean;
    url: string | null;
    createdAt: Date;
    updatedAt: Date;
}
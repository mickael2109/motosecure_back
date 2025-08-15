export interface Notification {
    id: number;
    userId: number;
    motoId: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
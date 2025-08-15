import { Notification } from "../entities/Notification";



export interface CreateNotificationInput {
  motoId: number;
  title: string;
  description: string;
}



export interface NotificationRepository {
  save(notif: CreateNotificationInput): Promise<Notification>;
  getAllNotificationUser(userId: number): Promise<Notification[]>;

}

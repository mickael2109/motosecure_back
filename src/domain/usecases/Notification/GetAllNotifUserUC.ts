import { Notification } from "../../entities/Notification";
import { NotificationRepository } from "../../repositories/INotificationRepository";



export class GetAllNotifUserUC {
  constructor(private readonly repo: NotificationRepository) {}

  async execute(userId: number): Promise<Notification[]> {
    // validations
    if (!userId) throw new Error("Veuillez completer tous les champs obligatoires!");
    
    return await this.repo.getAllNotificationUser(userId);
  }
}
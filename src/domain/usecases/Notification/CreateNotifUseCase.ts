import { CreateNotificationInput, NotificationRepository } from "../../repositories/INotificationRepository";
import { Notification } from "../../entities/Notification";


export class CreateNotifUseCase {
  constructor(private readonly repo: NotificationRepository) {}

  async execute(input: CreateNotificationInput): Promise<Notification> {
    // validations
    if (!input.motoId || !input.title || !input.description) throw new Error("Veuillez completer tous les champs obligatoires!");
    
    return await this.repo.save(input);
  }
}
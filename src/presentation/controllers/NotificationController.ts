
import { Request, Response } from "express";
import { PrismaNotificationRepository } from "../../infrastructure/db/PrismaNotificationRepository";
import { CreateNotifUseCase } from "../../domain/usecases/Notification/CreateNotifUseCase";
import { RequestWithIO } from "../../domain/entities/RequestWithIO";
import { GetAllNotifUserUC } from "../../domain/usecases/Notification/GetAllNotifUserUC";

export class NotificationController {


    //  create coordinate
    static async createNotification(req: RequestWithIO, res: Response) {
        try {
        const repo = new PrismaNotificationRepository();
        const useCase = new CreateNotifUseCase(repo);
        const rep = await useCase.execute(req.body);

        req.io.emit('alerte', {
          rep,
        });

        res.status(201).json({
            message: "notification bien ajouté",
            data: rep,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }


    //  get all notification user
    static async getAllNotificationUser(req: Request, res: Response) {
        try {
            
        const repo = new PrismaNotificationRepository();
        const useCase = new GetAllNotifUserUC(repo);
        const response = await useCase.execute(req.body.userId);
        
    
        res.status(201).json({
            message: "Liste des notifications!",
            data: response,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }


}
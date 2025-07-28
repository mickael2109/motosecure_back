
import { Request, Response } from "express";
import { PrismaMotoRepository } from "../../infrastructure/db/PrismaMotoRepository";
import { CreateMotoUseCase } from "../../domain/usecases/Moto/CreateMotoUC";
import { DeleteMotoUseCase } from "../../domain/usecases/Moto/DeleteMotoUC";
import { UpdateMotoUseCase } from "../../domain/usecases/Moto/UpdateMotoUC";
import { GetAllMotoUserUseCase } from "../../domain/usecases/Moto/GetAllMotoUserUC";
import { GetMotoUseCase } from "../../domain/usecases/Moto/GetMotoUC";

export class MotoController {

     //  get moto
    static async getMoto(req: Request, res: Response) {
        try {
        const repo = new PrismaMotoRepository();
        const useCase = new GetMotoUseCase(repo);
        const response = await useCase.execute(req.body.motoId);
        res.status(201).json({
            data: response,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }


    //  get all moto user
    static async getAllMotoUser(req: Request, res: Response) {
        try {
        const repo = new PrismaMotoRepository();
        const useCase = new GetAllMotoUserUseCase(repo);
        const response = await useCase.execute(req.body.userId);
        res.status(201).json({
            message: "Liste des motos de l'utilisateur récupérée avec succès!",
            data: response,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }



    //  create moto
    static async createMoto(req: Request, res: Response) {
        try {
        const repo = new PrismaMotoRepository();
        const useCase = new CreateMotoUseCase(repo);
        const user = await useCase.execute(req.body);
        res.status(201).json({
            data: user,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }


    //  update moto
    static async updateMoto(req: Request, res: Response) {
        try {
        const repo = new PrismaMotoRepository();
        const useCase = new UpdateMotoUseCase(repo);
        const user = await useCase.execute(req.body);
        res.status(201).json({
            message: "Informations de votre moto est mises à jour avec succès!",
            data: user,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }




    //  delete moto
    static async deleteMoto(req: Request, res: Response) {
        try {
        const repo = new PrismaMotoRepository();
        const useCase = new DeleteMotoUseCase(repo);
        const response = await useCase.execute(req.body.motoId);
        res.status(201).json({
            message: "Moto bien supprimé avec succès!",
            data: response,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }

}
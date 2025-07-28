
import { Request, Response } from "express";
import { PrismaCoordinateRepository } from "../../infrastructure/db/PrismaCoordinateRepository";
import { CreateCoordMotoUseCase } from "../../domain/usecases/Coordinate/CreateCoordMotoUC";
import { GetAllCoordinateMotoUseCase } from "../../domain/usecases/Coordinate/GetAllCoordinateMotoUC";
import { DeleteCoordinateTableUseCase } from "../../domain/usecases/Coordinate/DeleteTableCoordinateUC";

export class CoordinateController {

   

    //  get all coordinates of a moto
    static async getAllCoordinateMoto(req: Request, res: Response) {
        try {
        const repo = new PrismaCoordinateRepository();
        const useCase = new GetAllCoordinateMotoUseCase(repo);
        const response = await useCase.execute(req.body.motoId);
        res.status(201).json({
            message: " Les coordonnées de la moto ont été récupérées avec succès!",
            data: response,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }



    //  create coordinate
    static async createCoordinate(req: Request, res: Response) {
        try {
        const repo = new PrismaCoordinateRepository();
        const useCase = new CreateCoordMotoUseCase(repo);
        const rep = await useCase.execute(req.body);
        res.status(201).json({
            data: rep,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }


     //  delete table coordinate
    static async deleteCoordinate(req: Request, res: Response) {
        try {
        const repo = new PrismaCoordinateRepository();
        const useCase = new DeleteCoordinateTableUseCase(repo);
        await useCase.execute();
        res.status(201).json({
            message: " La table des coordonnées a été supprimée avec succès!",
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }

}
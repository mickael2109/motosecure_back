
import { Request, Response } from "express";
import { PrismaCoordinateRepository } from "../../infrastructure/db/PrismaCoordinateRepository";
import { CreateCoordMotoUseCase } from "../../domain/usecases/Coordinate/CreateCoordMotoUC";
import { GetAllCoordinateMotoUseCase } from "../../domain/usecases/Coordinate/GetAllCoordinateMotoUC";
import { DeleteCoordinateTableUseCase } from "../../domain/usecases/Coordinate/DeleteTableCoordinateUC";

import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { calculateTotalDistance } from "../../utils/calculDistance";

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



    //  get all history coordinates of a moto
    static async getAllHistoryCoordinateMoto(req: Request, res: Response) {
        try {
        const repo = new PrismaCoordinateRepository();
        const useCase = new GetAllCoordinateMotoUseCase(repo);
        const response = await useCase.execute(req.body.motoId);

        const sortedHistorique = [...response].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); 
        });

      
        const groupedCoordinate = sortedHistorique.reduce((acc, item) => {
            const date = item.createdAt;
            
            let key = '';
            if (isToday(date)) key = "Aujourd'hui";
            else if (isYesterday(date)) key = "Hier";
            else key = format(date, 'dd/MM/yyyy', { locale: fr });
            
            if (!acc[key]) {
                acc[key] = {
                    data: {
                        date: key,
                        km: "0",
                    },
                    coord: []
                };
            }
            acc[key].coord.push(item);
    
            return acc;
        },  {} as Record<string, { data: { date: string; km: string }; coord: typeof response }>);

        Object.entries(groupedCoordinate).forEach(([dateLabel, items]) => {
            const points = items.coord.map(item => ({
                lat: item.lat,
                long: item.long,
            }));

            const distanceMeters = calculateTotalDistance(points);
            const distanceKm = (distanceMeters / 1000).toFixed(2); 

            // ⬇️ Mettre à jour la distance ici :
            groupedCoordinate[dateLabel].data.km = distanceKm;
        });


        res.status(201).json({
            message: " Les coordonnées de la moto ont été récupérées avec succès!",
            data: groupedCoordinate,
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
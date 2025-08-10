
import { Request, Response } from "express";
import { PrismaMotoRepository } from "../../infrastructure/db/PrismaMotoRepository";
import { CreateMotoUseCase } from "../../domain/usecases/Moto/CreateMotoUC";
import { DeleteMotoUseCase } from "../../domain/usecases/Moto/DeleteMotoUC";
import { OnOffMotoUseCase, UpdateMotoUseCase, VibrationMotoUseCase } from "../../domain/usecases/Moto/UpdateMotoUC";
import { GetAllMotoUserUseCase } from "../../domain/usecases/Moto/GetAllMotoUserUC";
import { GetMotoUseCase } from "../../domain/usecases/Moto/GetMotoUC";
import { dataEtatMoto, dataVirabtionMoto, deviceState, etatInterface, isVibrationInterface } from "../../data/dataStocked";
import { RequestWithIO } from "../../domain/entities/RequestWithIO";



export class MotoController {


    //  get status moto
    static async getStatusMoto(req: Request, res: Response) {
        try {
       
            const existingIndex = dataEtatMoto.findIndex(item => item.id === req.body.id);

            if (existingIndex !== -1) {
                return res.status(200).json({
                    data: dataEtatMoto[existingIndex],
                    success: true,
                });
            }

            res.status(201).json({
                data: "Ce moto n'existe pas",
                success: false,
            });
        } catch (err: any) {
            res.status(400).json({ message: err.message, success: false });
        }
    }



     //  get isVibration moto
    static async getisVibrationMoto(req: Request, res: Response) {
        try {
       
            const existingIndex = dataVirabtionMoto.findIndex(item => item.id === req.body.id);

            if (existingIndex !== -1) {
                return res.status(200).json({
                    data: dataVirabtionMoto[existingIndex],
                    success: true,
                });
            }

            res.status(201).json({
                data: "Ce moto n'existe pas",
                success: false,
            });
        } catch (err: any) {
            res.status(400).json({ message: err.message, success: false });
        }
    }




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





    //  update status moto
    static async updateStatusMoto(req: RequestWithIO, res: Response) {
        try {
        const repo = new PrismaMotoRepository();
        const useCase = new OnOffMotoUseCase(repo);
        const user = await useCase.execute(req.body);

        let message = "Votre moto est éteint"
        if(req.body.status === true) message = "Votre moto est allumé"

     

        let statusMoteur = req.body.status === true ? "on" : "off"
        
        const prev = deviceState[req.body.id] || { moteur: "on", bip: false, version: 0, updatedAt: 0 };
        const next = {
            moteur: statusMoteur ?? prev.moteur,
            bip: false,
            version: prev.version + 1,
            updatedAt: Date.now()
        };
        deviceState[req.body.id] = next;


        req.io.emit('statusmoto', {
          message: message,
          motoId : req.body.id,
          status: req.body.status,
        });


        res.status(201).json({
            message: message,
            data: user,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }



     //  update vibration moto
    static async updateVibrationMoto(req: Request, res: Response) {
        try {
        const repo = new PrismaMotoRepository();
        const useCase = new VibrationMotoUseCase(repo);
        const user = await useCase.execute(req.body);

        let message = "Vibration desactivé"
        if(req.body.isVibration === true) message = "Vibration activé"

        const key : isVibrationInterface = {
            id: req.body.id,
            isVibration: req.body.isVibration
        }


        const existingIndex = dataVirabtionMoto.findIndex(item => item.id === key.id);

        if (existingIndex !== -1) {
            dataVirabtionMoto[existingIndex].isVibration = key.isVibration;
        }

        console.log("📦 dataVirabtionMoto :", dataVirabtionMoto);
        
        
        res.status(201).json({
            message: message,
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
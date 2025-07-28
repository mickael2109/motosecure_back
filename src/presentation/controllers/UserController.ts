import { CreateUserUseCase } from "../../domain/usecases/User/CreateUserUseCase";
import { LoginUserUseCase } from "../../domain/usecases/User/LoginUserUC";
import { UpdateUserUseCase } from "../../domain/usecases/User/UpdateUserUC";
import { PrismaUserRepository } from "../../infrastructure/db/PrismaUserRepository";
import { Request, Response } from "express";
import { config } from 'dotenv';
import jwt from "jsonwebtoken"
import { DeleteUserUseCase } from "../../domain/usecases/User/DeleteUserUC";
import { GetUserUseCase } from "../../domain/usecases/User/GetUserUC";
import { GetAllUserUseCase } from "../../domain/usecases/User/GetAllUserUC";


config();

const SECRET_KEY = process.env.JWT_SECRET || "mickaelrakotondravony"; 

export class UserController {

     //  get all users
    static async getAllUsers(req: Request, res: Response) {
        try {
        const repo = new PrismaUserRepository();
        const useCase = new GetAllUserUseCase(repo);
        const user = await useCase.execute();
        res.status(201).json({
            message: "Liste des utilisateurs récupérée avec succès!",
            data: user,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }


    //  get user
    static async getUser(req: Request, res: Response) {
        try {
        const repo = new PrismaUserRepository();
        const useCase = new GetUserUseCase(repo);
        const user = await useCase.execute(req.body.userId);
        res.status(201).json({
            data: user,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }



    //  create user
    static async createUser(req: Request, res: Response) {
        try {
        const repo = new PrismaUserRepository();
        const useCase = new CreateUserUseCase(repo);
        const user = await useCase.execute(req.body);
        res.status(201).json({
            data: user,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }


    //  update user
    static async updateUser(req: Request, res: Response) {
        try {
        const repo = new PrismaUserRepository();
        const useCase = new UpdateUserUseCase(repo);
        const user = await useCase.execute(req.body);
        res.status(201).json({
            message: "Informations de l'utilisateur mises à jour avec succès!",
            data: user,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }




    //  delete user
    static async deleteUser(req: Request, res: Response) {
        try {
        const repo = new PrismaUserRepository();
        const useCase = new DeleteUserUseCase(repo);
        const user = await useCase.execute(req.body.userId);
        res.status(201).json({
            message: "L'utilisateur est bien supprimé avec succès!",
            data: user,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }


    



     //  login user
    static async loginUser(req: Request, res: Response) {
        try {
        const repo = new PrismaUserRepository();
        const useCase = new LoginUserUseCase(repo);
        const user = await useCase.execute(req.body);

        // Supprimer le mot de passe du retour
        const { password, ...userWithoutPassword } = user;

        // créer token 
         const token = jwt.sign({
            user: user.id,
            email: user.email
        }, SECRET_KEY);


        res.status(201).json({
            token : token,
            data: userWithoutPassword,
            success: true,
        });
        } catch (err: any) {
        res.status(400).json({ message: err.message, success: false });
        }
    }
}
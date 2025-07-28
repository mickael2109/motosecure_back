import  prisma  from "../../../lib/prisma"; 
import { Moto } from "../../entities/Moto";
import { MotoRepository } from "../../repositories/IMotoRepository";


export class GetAllMotoUserUseCase {
  constructor(private readonly repo: MotoRepository) {}

  async execute(userId: number): Promise<Moto[]> {
    if (!userId) throw new Error("Veuillez ajouter 'UserId!");
    const existingUserEmail = await prisma.user.findUnique({where: { id: userId }});
    if (!existingUserEmail) throw new Error("Cette utilisateur n'existe pas!");
    return await this.repo.getAllMotoUser(userId);
  }
}
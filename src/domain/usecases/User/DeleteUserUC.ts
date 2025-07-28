import { User } from "../../entities/User";
import  prisma  from "../../../lib/prisma"; 
import { UserRepository } from "../../repositories/IUserRepository";


export class DeleteUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(userId: number): Promise<User> {
    // validations
    if (!userId) throw new Error("Veuillez ajouter 'UserId!");
    // trouver si l'utilisateur existe 
    const existingUserEmail = await prisma.user.findUnique({where: { id: userId }});
    if (!existingUserEmail) throw new Error("Cette utilisateur n'existe pas!");
  
    return await this.repo.delete(userId);
  }
}
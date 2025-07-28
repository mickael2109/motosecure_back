import { User } from "../../entities/User";
import  prisma  from "../../../lib/prisma"; 
import { UpdateUserInput, UserRepository } from "../../repositories/IUserRepository";



export class UpdateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: UpdateUserInput): Promise<User> {
    // trouver si l'utilisateur existe dans la base
    const existingUser = await prisma.user.findUnique({where: { id: input.id }});
    if (!existingUser) throw new Error("Cette utilisateur n'existe pas!");
    
    return await this.repo.update(input);
  }
}
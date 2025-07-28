import { User } from "../../entities/User";
import validator from 'validator';
import  prisma  from "../../../lib/prisma"; 
import { CreateUserInput, UserRepository } from "../../repositories/IUserRepository";
import bcrypt from 'bcryptjs';


export class LoginUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    // validations
    if (!input.password || !input.email) throw new Error("Veuillez completer tous les champs obligatoires!");
    if (!validator.isEmail(input.email)) throw new Error("Veuillez fournir une adresse email valide!");
    
    // trouver si l'utilisateur existe déjà
    const existingUserEmail = await prisma.user.findFirst({where: { email: input.email }});
    if (!existingUserEmail) throw new Error("Cette utilisateur n'existe pas!");

    const passwordMatch = await bcrypt.compare(input.password, existingUserEmail.password);
    if (!passwordMatch)  throw new Error("Mot de passe incorrecte!");
    
    return await this.repo.login(input);
  }
}
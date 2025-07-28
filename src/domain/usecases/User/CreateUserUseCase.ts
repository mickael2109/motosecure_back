import { User } from "../../entities/User";
import validator from 'validator';
import  prisma  from "../../../lib/prisma"; 
import { CreateUserInput, UserRepository } from "../../repositories/IUserRepository";
import bcrypt from 'bcryptjs';


export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    // validations
    if (!input.password || !input.email) throw new Error("Veuillez completer tous les champs obligatoires!");
    if (!validator.isEmail(input.email)) throw new Error("Veuillez fournir une adresse email valide!");
    if (!validator.isStrongPassword(input.password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
    }))  throw new Error("Le mot de passe n\'est pas assez sécurisé. Il doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole!");

    // trouver si l'utilisateur existe déjà
    const existingUserEmail = await prisma.user.findFirst({where: { email: input.email }});
    if (existingUserEmail) throw new Error("Un utilisateur avec cette adresse email existe déjà!");

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const userToSave: CreateUserInput = {
      ...input,
      password: hashedPassword
    };
    
    return await this.repo.save(userToSave);
  }
}
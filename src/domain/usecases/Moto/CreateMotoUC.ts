import  prisma  from "../../../lib/prisma"; 
import { Moto } from "../../entities/Moto";
import { CreateMotoInput, MotoRepository } from "../../repositories/IMotoRepository";


export class CreateMotoUseCase {
  constructor(private readonly repo: MotoRepository) {}

  async execute(input: CreateMotoInput): Promise<Moto> {
    if (!input.pseudo || !input.userId || !input.num_serie) throw new Error("Veuillez completer tous les champs obligatoires!");
  
    const existingMoto = await prisma.moto.findFirst({where: { num_serie: input.num_serie }});
    if (existingMoto) throw new Error("Numéro de série existe déjà!");


    const existingUser = await prisma.user.findUnique({where: { id: input.userId }});
    if (!existingUser) throw new Error("Cette utilisateur n'existe pas!");
    
    return await this.repo.save(input);
  }
}
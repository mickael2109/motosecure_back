import  prisma  from "../../../lib/prisma"; 
import { Moto } from "../../entities/Moto";
import { MotoRepository, UpdateMotoInput } from "../../repositories/IMotoRepository";


export class UpdateMotoUseCase {
  constructor(private readonly repo: MotoRepository) {}

  async execute(input: UpdateMotoInput): Promise<Moto> {
    const existingMoto = await prisma.moto.findUnique({where: { id: input.id }});
    if (!existingMoto) throw new Error("Cette moto n'existe pas!");
    
    return await this.repo.update(input);
  }
}
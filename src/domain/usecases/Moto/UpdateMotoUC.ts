import  prisma  from "../../../lib/prisma"; 
import { Moto } from "../../entities/Moto";
import { MotoRepository, OnOffMotoInput, UpdateMotoInput, VibrationMotoInput } from "../../repositories/IMotoRepository";


export class UpdateMotoUseCase {
  constructor(private readonly repo: MotoRepository) {}

  async execute(input: UpdateMotoInput): Promise<Moto> {
    const existingMoto = await prisma.moto.findUnique({where: { id: input.id }});
    if (!existingMoto) throw new Error("Cette moto n'existe pas!");
    
    return await this.repo.update(input);
  }
}




export class OnOffMotoUseCase {
  constructor(private readonly repo: MotoRepository) {}

  async execute(input: OnOffMotoInput): Promise<Moto> {
    const existingMoto = await prisma.moto.findUnique({where: { id: input.id }});
    if (!existingMoto) throw new Error("Cette moto n'existe pas!");
    
    return await this.repo.updateStatus(input);
  }
}




export class VibrationMotoUseCase {
  constructor(private readonly repo: MotoRepository) {}

  async execute(input: VibrationMotoInput): Promise<Moto> {
    const existingMoto = await prisma.moto.findUnique({where: { id: input.id }});
    if (!existingMoto) throw new Error("Cette moto n'existe pas!");
    
    return await this.repo.updateVibration(input);
  }
}




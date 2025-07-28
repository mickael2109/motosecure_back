import  prisma  from "../../../lib/prisma"; 
import { Moto } from "../../entities/Moto";
import { MotoRepository } from "../../repositories/IMotoRepository";


export class GetMotoUseCase {
  constructor(private readonly repo: MotoRepository) {}

  async execute(motoId: number): Promise<Moto> {
    if (!motoId) throw new Error("Veuillez ajouter 'motoId!");
    const existingMoto = await prisma.moto.findUnique({where: { id: motoId }});
    if (!existingMoto) throw new Error("Cette moto n'existe pas!");
    return await this.repo.getMoto(motoId);
  }
}
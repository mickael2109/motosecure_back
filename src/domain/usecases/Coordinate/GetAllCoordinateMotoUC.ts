import  prisma  from "../../../lib/prisma"; 
import { Coordinate } from "../../entities/Coordinate";
import { CoordinateRepository } from "../../repositories/ICoordinateRepository";


export class GetAllCoordinateMotoUseCase {
  constructor(private readonly repo: CoordinateRepository) {}

  async execute(motoId: number): Promise<Coordinate[]> {
    if (!motoId) throw new Error("Veuillez ajouter 'motoId!");

    const existingMoto = await prisma.moto.findUnique({where: { id: motoId }});
    if (!existingMoto) throw new Error("Cette moto n'existe pas!");

    return await this.repo.getAllCoordinateMoto(motoId);
  }
}
import  prisma  from "../../../lib/prisma"; 
import { comparateDate } from "../../../utils/comparateDate";
import { Coordinate } from "../../entities/Coordinate";
import moment from "moment";
import { CoordinateRepository, CreateCoordinateInput } from "../../repositories/ICoordinateRepository";

export class CreateCoordMotoUseCase {
  constructor(private readonly repo: CoordinateRepository) {}

  async execute(input: CreateCoordinateInput): Promise<Coordinate> {
    if (!input.motoId || !input.long || !input.lat || !input.speed || !input.cap) throw new Error("Veuillez completer tous les champs obligatoires!");
  
    const existingMoto = await prisma.moto.findFirst({where: { id: input.motoId }});
    if (!existingMoto) throw new Error("Cette moto n'existe déjà!");
    
    let now = moment();
    if(comparateDate())now = now.add(3, 'hours')

    const coordonateToSave: CreateCoordinateInput = {
      ...input,
      date: now.toDate() 
    };

    return await this.repo.save(coordonateToSave);
  }
}
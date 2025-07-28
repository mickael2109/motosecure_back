import { Coordinate } from "../../domain/entities/Coordinate";
import { CoordinateRepository, CreateCoordinateInput } from "../../domain/repositories/ICoordinateRepository";
import  prisma  from "../../lib/prisma"; 

export class PrismaCoordinateRepository implements CoordinateRepository {

  // get all coordinates of a moto
  async getAllCoordinateMoto(motoId: number) {
    return await prisma.coordinate.findMany({
      where: { motoId: motoId },
      include: { Moto: true },
      orderBy: { id: 'desc' }
    }) as Coordinate[];
  }


  // create coordinate
  async save(input: CreateCoordinateInput) {
    const create = await prisma.coordinate.create({
      data: input
    });

    return await prisma.coordinate.findUnique({
      where: { id: create.id },
      include: { Moto: true }
    }) as Coordinate;
  }


  // delete all coordinates
  async deleteAll() {
    await prisma.coordinate.deleteMany();
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Coordinate_id_seq" RESTART WITH 1`);
  }

}
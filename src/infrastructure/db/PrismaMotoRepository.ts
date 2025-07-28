
import { Moto } from "../../domain/entities/Moto";
import { CreateMotoInput, MotoRepository, UpdateMotoInput } from "../../domain/repositories/IMotoRepository";
import  prisma  from "../../lib/prisma"; 

export class PrismaMotoRepository implements MotoRepository {

  // get moto
  async getMoto(motoId: number) {
    return await prisma.moto.findUnique({
      where: { id: motoId },
      include: { User: true }
    }) as Moto;
  }


  // get all moto user
  async getAllMotoUser(userId: number) {
    return await prisma.moto.findMany({
      where: { userId: userId },
      include: { User: true }
    }) ;
  }


  // create moto
  async save(input: CreateMotoInput) {
    const createMoto = await prisma.moto.create({
      data: input,
    });

    return await prisma.moto.findUnique({
      where: { id: createMoto.id },
      include: { User: true }
    }) as Moto;
  }


  // update user
  async update(input: UpdateMotoInput) {
    const updateMoto = await prisma.moto.update({
      where: { id: input.id },
      data: input,
    });
    return await prisma.moto.findUnique({
      where: { id: updateMoto.id },
      include: { User: true }
    }) as Moto;
  }

  // delete moto
  async delete(motoId: number) {
    return await prisma.moto.delete({
      where: { id: motoId }
    });
  }

   

}
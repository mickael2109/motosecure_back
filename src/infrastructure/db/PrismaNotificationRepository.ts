
import { Notification } from "../../domain/entities/Notification";
import { CreateMotoInput, MotoRepository, OnOffMotoInput, UpdateMotoInput, VibrationMotoInput } from "../../domain/repositories/IMotoRepository";
import { CreateNotificationInput, NotificationRepository } from "../../domain/repositories/INotificationRepository";
import  prisma  from "../../lib/prisma"; 

export class PrismaNotificationRepository implements NotificationRepository {


  // create notification
  async save(input: CreateNotificationInput) {

    const user = await prisma.moto.findUnique({
      where: { id: input.motoId },
      include: { User: true }
    })

    let data = {
      ...input,
      userId: user?.id || 1
    }

    const createMoto = await prisma.notification.create({
      data: data,
    });

    return await prisma.notification.findUnique({
      where: { id: createMoto.id },
      include: { 
        User: true, 
        Moto: true
       }
    }) as Notification;
  }


  // get all notification user
  async getAllNotificationUser(userId: number) {
    return await prisma.notification.findMany({
      where: { userId: userId },
      include: { User: true, Moto: true },
      orderBy: {id: "desc"}
    }) as Notification[];
  }
  


  // delete moto
  // async delete(motoId: number) {
  //   return await prisma.moto.delete({
  //     where: { id: motoId }
  //   });
  // }

   

}
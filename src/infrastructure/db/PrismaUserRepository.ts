
import { User } from "../../domain/entities/User";
import { CreateUserInput, UpdateUserInput, UserRepository } from "../../domain/repositories/IUserRepository";
import  prisma  from "../../lib/prisma"; 

export class PrismaUserRepository implements UserRepository {

  // getAll user
  async getAll() {
    return await prisma.user.findMany();
  }


  // get user
  async get(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId }
    }) as User;
  }


  // create user
  async save(input: CreateUserInput) {
    return await prisma.user.create({
      data: input,
    });
  }


  // update user
  async update(input: UpdateUserInput) {
    return await prisma.user.update({
      where: { id: input.id },
      data: input,
    });
  }

  // delete user
  async delete(userId: number) {
    return await prisma.user.delete({
      where: { id: userId }
    });
  }


  // login user
  async login(input: CreateUserInput) {
    return await prisma.user.findFirst({
      where: { email: input.email }
    }) as User;
  }


   

}
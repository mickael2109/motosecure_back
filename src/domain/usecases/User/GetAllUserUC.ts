import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/IUserRepository";


export class GetAllUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.repo.getAll();
  }
}
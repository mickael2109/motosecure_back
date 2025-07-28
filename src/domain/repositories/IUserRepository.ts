import { User } from "../entities/User";


export interface CreateUserInput {
  email: string;
  password: string;
}


export interface UpdateUserInput {
    id: number;
    name: string | null;
    pseudo: string | null;
    adresse: string | null;
    phone: string | null;
    url: string | null;
}


export interface UserRepository {
  save(user: CreateUserInput): Promise<User>;
  update(user: UpdateUserInput): Promise<User>;
  login(user: CreateUserInput): Promise<User>;
  delete(userId: number): Promise<User>;
  get(userId: number): Promise<User>;
  getAll(): Promise<User[]>;

}

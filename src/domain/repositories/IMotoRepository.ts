import { Moto } from "../entities/Moto";


export interface CreateMotoInput {
  num_serie: string;
  pseudo: string;
  userId: number;
}


export interface UpdateMotoInput {
    id: number;
    pseudo: string;
}


export interface MotoRepository {
  save(user: CreateMotoInput): Promise<Moto>;
  update(user: UpdateMotoInput): Promise<Moto>;
  delete(motoId: number): Promise<Moto>;
  getAllMotoUser(userId: number): Promise<Moto[]>;
  getMoto(motoId: number): Promise<Moto>;

}

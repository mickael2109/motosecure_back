import { Coordinate } from "../entities/Coordinate";


export interface CreateCoordinateInput {
  motoId: number;
  long: number;
  lat: number;
  speed: number;
  cap: string;
  date: Date;
}



export interface CoordinateRepository {
  save(coordinate: CreateCoordinateInput): Promise<Coordinate>;
  getAllCoordinateMoto(motoId: number): Promise<Coordinate[]>;
  deleteAll(): Promise<any>;

}

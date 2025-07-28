import  prisma  from "../../../lib/prisma"; 
import { comparateDate } from "../../../utils/comparateDate";
import { Coordinate } from "../../entities/Coordinate";
import moment from "moment";
import { CoordinateRepository, CreateCoordinateInput } from "../../repositories/ICoordinateRepository";

export class DeleteCoordinateTableUseCase {
  constructor(private readonly repo: CoordinateRepository) {}
  async execute() {
    return await this.repo.deleteAll();
  }
}
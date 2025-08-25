// tests/moto.test.ts
import { Request, Response } from "express";
import { MotoController } from "../presentation/controllers/MotoController";
import { CreateMotoUseCase } from "../domain/usecases/Moto/CreateMotoUC";

jest.mock("../src/domain/usecases/Moto/CreateMotoUC");

describe("MotoController - createMoto", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: { pseudo: "Yamaha", num_serie: "MT-07", userId: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it("should create a moto successfully", async () => {
    // Mock du usecase
    (CreateMotoUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: jest.fn().mockResolvedValue({
          id: 1,
          pseudo: "Yamaha",
          num_serie: "MT-07",
          userId: 1
        })
      };
    });

    // Appel du contrôleur
    await MotoController.createMoto(req as Request, res as Response);

    // Vérification
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        id: 1,
        pseudo: "Yamaha",
        num_serie: "MT-07",
        userId: 1
      },
      success: true,
    });
  });
});

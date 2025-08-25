import { Request, Response } from "express";
import { UserController } from "../src/presentation/controllers/UserController";
import { CreateUserUseCase } from "../src/domain/usecases/User/CreateUserUseCase";

jest.mock("../src/domain/usecases/User/CreateUserUseCase");

describe("UserController - createUser", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: { email: "test@example.com", password: "Mickael0@" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it("should create a user successfully", async () => {
    (CreateUserUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: jest.fn().mockResolvedValue({
          id: 1,
          email: "test@example.com",
          password: "Mickael0@"
        })
      };
    });

    await UserController.createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        id: 1,
        email: "test@example.com",
        password: "Mickael0@"
      },
      success: true,
    });
  });
});

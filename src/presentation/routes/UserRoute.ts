import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.get("/getall", UserController.getAllUsers);
router.post("/get", UserController.getUser);
router.post("/create", UserController.createUser);
router.post("/update", UserController.updateUser);
router.post("/login", UserController.loginUser);
router.delete("/delete", UserController.deleteUser);

export default router;
import { Router } from "express";
import { MotoController } from "../controllers/MotoController";

const router = Router();

router.post("/get", MotoController.getMoto);
router.post("/getallmotouser", MotoController.getAllMotoUser);
router.post("/create", MotoController.createMoto);
router.post("/update", MotoController.updateMoto);
router.delete("/delete", MotoController.deleteMoto);

export default router;
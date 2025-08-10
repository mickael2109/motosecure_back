import { Router } from "express";
import { MotoController } from "../controllers/MotoController";

const router = Router();

router.post("/getstatus", MotoController.getStatusMoto);
router.post("/getviration", MotoController.getisVibrationMoto);

router.post("/get", MotoController.getMoto);
router.post("/getallmotouser", MotoController.getAllMotoUser);
router.post("/create", MotoController.createMoto);
router.post("/update", MotoController.updateMoto);
router.post("/update/:id/command", MotoController.updateStatusMoto);
router.post("/updatevibration", MotoController.updateVibrationMoto);
router.delete("/delete", MotoController.deleteMoto);

export default router;
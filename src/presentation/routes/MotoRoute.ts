import { Router } from "express";
import { MotoController } from "../controllers/MotoController";

const router = Router();

router.post("/getstatus", MotoController.getStatusMoto);
router.post("/getviration", MotoController.getisVibrationMoto);

router.post("/get", MotoController.getMoto);
router.post("/getallmotouser", MotoController.getAllMotoUser);
router.post("/create", MotoController.createMoto);
router.post("/update", MotoController.updateMoto);

router.post("/updatestatus", (req: any, res) => {
  MotoController.updateStatusMoto(req, res);
});

router.post("/updatevibration", (req: any, res) => {
  MotoController.updateVibrationMoto(req, res);
});

router.delete("/delete", MotoController.deleteMoto);

export default router;
import { Router } from "express";
import { CoordinateController } from "../controllers/CoordinateController";

const router = Router();

router.post("/getallcoordmoto", CoordinateController.getAllCoordinateMoto);
router.post("/create", CoordinateController.createCoordinate);
router.delete("/deleteall", CoordinateController.deleteCoordinate);

export default router;
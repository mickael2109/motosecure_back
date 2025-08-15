import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";

const router = Router();

router.post("/create", (req: any, res) => {
  NotificationController.createNotification(req, res);
});
router.post("/getall", NotificationController.getAllNotificationUser);

export default router;
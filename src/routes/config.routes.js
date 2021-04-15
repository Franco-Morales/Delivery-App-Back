import { Router } from "express";
import ConfigCtrl from "../controllers/config.controller";

const router = Router();

router.get('/config/:id',ConfigCtrl.getOne);
router.put('/config/:id',ConfigCtrl.updateOne);

export default router;

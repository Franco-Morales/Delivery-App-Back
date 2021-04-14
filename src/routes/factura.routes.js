import { Router } from "express";
import FacturaCtrl from "../controllers/factura.controller";


const router = Router();

router.get('/factura',FacturaCtrl.getAll);
router.post('/factura',FacturaCtrl.postOne);

router.get('/factura/:id',FacturaCtrl.getOne);
router.put('/factura/:id',FacturaCtrl.updateOne);
router.delete('/factura/:id',FacturaCtrl.deleteOne);

export default router;

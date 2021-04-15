
import { Router } from "express";
import MercadoPagoCtrl from "../controllers/mercadoPago.controller";


const router = Router();

router.get('/mdopago',MercadoPagoCtrl.getAll);
router.post('/mdopago',MercadoPagoCtrl.postOne);

router.get('/mdopago/:id',MercadoPagoCtrl.getOne);
router.put('/mdopago/:id',MercadoPagoCtrl.updateOne);
router.delete('/mdopago/:id',MercadoPagoCtrl.deleteOne);
router.patch('/mdopago/:id', MercadoPagoCtrl.active);

export default router;

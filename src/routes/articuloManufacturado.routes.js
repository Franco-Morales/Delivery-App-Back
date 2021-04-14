import { Router } from "express";
import ArticuloManufacturadoCtrl from "../controllers/factura.controller";


const router = Router();

router.get('/artmanu',ArticuloManufacturadoCtrl.getAll);
router.post('/artmanu',ArticuloManufacturadoCtrl.postOne);

router.get('/artmanu/:id',ArticuloManufacturadoCtrl.getOne);
router.put('/artmanu/:id',ArticuloManufacturadoCtrl.updateOne);
router.delete('/artmanu/:id',ArticuloManufacturadoCtrl.deleteOne);


export default router;
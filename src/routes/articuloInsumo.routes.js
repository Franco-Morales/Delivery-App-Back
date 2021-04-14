import { Router } from "express";
import ArticuloInsumoCtrl from "../controllers/articuloInsumo.controller";


const router = Router();

router.get('/artin',ArticuloInsumoCtrl.getAll);
router.post('/artin',ArticuloInsumoCtrl.postOne);

router.get('/artin/:id',ArticuloInsumoCtrl.getOne);
router.put('/artin/:id',ArticuloInsumoCtrl.updateOne);
router.delete('/artin/:id',ArticuloInsumoCtrl.deleteOne);

export default router;

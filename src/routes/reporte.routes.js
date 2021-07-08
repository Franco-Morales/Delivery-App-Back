import { Router } from "express";
import ReporteCtrl from "../controllers/reporte.controller.js";


const router = Router();


router.get('/reporte/comida/ranking', ReporteCtrl.comidaMasPedida);
router.get('/reporte/pedido', ReporteCtrl.pedidosAgrupadosporCliente);
router.get('/reporte/ingreso',ReporteCtrl.ingresosPorPeriodo)
router.get('/reporte/ganancia',ReporteCtrl.gananciaPorPeriodo)



export default router;

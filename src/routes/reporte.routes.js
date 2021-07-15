import { Router } from "express";
import ReporteCtrl from "../controllers/reporte.controller.js";


const router = Router();


router.post('/reporte/comida/ranking', ReporteCtrl.comidaMasPedida);
router.post('/reporte/pedido', ReporteCtrl.pedidosAgrupadosporCliente);
router.post('/reporte/ingreso',ReporteCtrl.ingresosPorPeriodo)
router.post('/reporte/ganancia',ReporteCtrl.gananciaPorPeriodo)
router.get('/reporte/fecha/entregado',ReporteCtrl.fechaInicioFechaLimite)


export default router;

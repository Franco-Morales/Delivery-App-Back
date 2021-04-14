import { Router } from "express";
import PedidoCtrl from "../controllers/pedido.controller";


const router = Router();

router.get('/pedido',PedidoCtrl.getAll);
router.post('/pedido',PedidoCtrl.postOne);

// router.get('/rubroarticulo/paginado',Object.function)
router.get('/pedido/:id',PedidoCtrl.getOne);
router.put('/pedido/:id',PedidoCtrl.updateOne);
router.delete('/pedido/:id',PedidoCtrl.deleteOne);

export default router;

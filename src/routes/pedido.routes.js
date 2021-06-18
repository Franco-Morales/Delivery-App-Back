import { Router } from "express";
import PedidoCtrl from "../controllers/pedido.controller";


const router = Router();

router.get('/pedido',PedidoCtrl.getAll);
router.get('/pedido/byUsers/:fid', PedidoCtrl.getAllbyUser);
router.post('/pedido',PedidoCtrl.postOne);

// router.get('/rubroarticulo/paginado',Object.function)
router.get('/pedido/:id',PedidoCtrl.getOne);
router.put('/pedido/:id',PedidoCtrl.updateOne);
router.delete('/pedido/:id',PedidoCtrl.deleteOne);
router.patch('/pedido/:id', PedidoCtrl.active);


//filter routes
router.get('/pedido/byState/:state',PedidoCtrl.getPedidosByState)
router.put('/pedido/accept/:id',PedidoCtrl.acceptPedido)

//demorar pedido

router.get('/pedido/demorar/:id', PedidoCtrl.demorarPedido)
export default router;

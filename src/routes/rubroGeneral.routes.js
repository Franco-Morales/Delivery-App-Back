import { Router } from "express";
import RubGnlCtrl from "../controllers/rubroGeneral.controller";


const router = Router();

router.get('/rubrogeneral',RubGnlCtrl.getAll);
router.post('/rubrogeneral',RubGnlCtrl.postOne);

// router.get('/rubrogeneral/paginado',Object.function)
router.get('/rubrogeneral/:id',RubGnlCtrl.getOne);
router.put('/rubrogeneral/:id',RubGnlCtrl.updateOne);
router.delete('/rubrogeneral/:id',RubGnlCtrl.deleteOne);
router.patch('/rubrogeneral/:id', RubGnlCtrl.active);

export default router;
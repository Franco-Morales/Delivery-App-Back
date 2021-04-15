import { Router } from "express";
import RubArtCtrl from "../controllers/rubroArticulo.controller";


const router = Router();

router.get('/rubroarticulo',RubArtCtrl.getAll);
router.post('/rubroarticulo',RubArtCtrl.postOne);

router.get('/rubroarticulo/:id',RubArtCtrl.getOne);
router.put('/rubroarticulo/:id',RubArtCtrl.updateOne);
router.delete('/rubroarticulo/:id',RubArtCtrl.deleteOne);
router.patch('/rubroarticulo/:id', RubArtCtrl.active);

export default router;

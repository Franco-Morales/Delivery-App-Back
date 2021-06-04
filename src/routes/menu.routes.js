import { Router } from "express";
import MenuCtrl from "../controllers/menu.controller.js";


const router = Router();


router.get('/menu', MenuCtrl.getAllMenu);



export default router;
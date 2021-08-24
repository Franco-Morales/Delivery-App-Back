import { Router } from "express";
import AdminController from "../controllers/admin.controller";


const router = Router();

router.post('/auth/create', AdminController.createUserEmployee);



export default router;
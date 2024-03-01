import { Router } from "express";
import employeeController from "../controllers/employee_controller";
import authenController from "../controllers/authen_controller";

const router = Router();

router.post("/login", employeeController.login);
router.post("/logout", authenController.logout);

export default router;

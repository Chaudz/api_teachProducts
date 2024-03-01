import { Router } from "express";
import customerController from "../controllers/customer_controller";
import authenController from "../controllers/authen_controller";

const router = Router();

router.post("/login", customerController.login);
router.post("/logout", authenController.logout);
router.post("/register", customerController.register);

export default router;

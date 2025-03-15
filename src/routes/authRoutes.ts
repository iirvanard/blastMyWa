import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/auth/AuthService";

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));
router.post("/refresh", authController.refreshToken.bind(authController));
router.post("/change-password", authController.changePassword.bind(authController));
router.post("/forgot-password", authController.forgotPassword.bind(authController));
router.post("/reset-password", authController.resetPassword.bind(authController));

export default router;

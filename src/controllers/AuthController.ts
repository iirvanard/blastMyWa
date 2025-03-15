import { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthService } from "../services/auth/AuthService";
import { LoginInput, loginSchema } from "../schemas/auth/login";
import { RegisterInput, registerSchema } from "../schemas/auth/register";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: LoginInput = loginSchema.parse(req.body);
      const user = await this.authService.login(validatedData.email, validatedData.password);
      
 
      res.status(201).json(user);

    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Unknown error during login." });
      }
    }
  }
  

  async register(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: RegisterInput = registerSchema.parse(req.body);
      const newUser = await this.authService.register(validatedData);
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Unknown error during registration." });
      }
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.refreshToken(req.body.refresh_token);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error." });
    }
  }


  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { userId, newPassword } = req.body;
      const updatedUser = await this.authService.changePassword(userId, newPassword);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error." });
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.authService.forgotPassword(req.body.email);
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error." });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { userId, newPassword } = req.body;
      const updatedUser = await this.authService.resetPassword(userId, newPassword);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error." });
    }
  }
}
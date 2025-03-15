import { JwtService } from "../../utils/jwt.utils";
import { prisma, PrismaClientKnownRequestError } from "../../utils/lib/prisma";
import bcrypt from "bcrypt";

export class AuthService {

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
  
    if (!user) {
      throw new Error("Invalid email or password.");
    }
  
    // Periksa apakah password sesuai dengan hash yang tersimpan di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }
  
    // Generate JWT token
    const accessToken = JwtService.generateToken(
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      "15m"
    ); // Access token berlaku 15 menit
  
    const refreshToken = JwtService.generateToken(
      {
        userId: user.id,
        email: user.email,
        tokenType: "REFRESH",
      },
      "7d"
    ); // Refresh token berlaku 7 hari
  
    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      accessToken,
      refreshToken
    };
  }

  async register(userData: { firstName: string; lastName: string; email: string; password: string }) {
    try {
      // Hash password sebelum disimpan ke database
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      return await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new Error("A user with this email already exists.");
      }
      throw new Error("Error creating user.");
    }
  }
  async refreshToken(refresh: string) {
    try {
      // Verifikasi token
      const decoded = JwtService.verifyToken(refresh);
  
      // Pastikan token adalah objek dan memiliki userId serta email
      if (!decoded || typeof decoded !== "object" || !decoded.userId || !decoded.email) {
        throw new Error("Invalid refresh token.");
      }
  
      if (!decoded || decoded.tokenType !== "REFRESH") {
        throw new Error("Invalid token type. Expected a refresh token.");
      }
  
      // Cari user berdasarkan userId
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: decoded.userId },
      });
  
      // Generate access token baru
      const accessToken = JwtService.generateToken(
        {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        "15m"
      );
  
      return { accessToken };
    } catch (error) {
      throw error;
    }
  }
  
  

  async changePassword(userId: number, newPassword: string) {
    try {
      const updatedUser = await prisma.user.update({ where: { id: userId }, data: { password: newPassword } });
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating password.");
    }
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found.");
    }
    return { message: "Password reset link sent." };
  }

  async resetPassword(userId: number, newPassword: string) {
    try {
      const updatedUser = await prisma.user.update({ where: { id: userId }, data: { password: newPassword } });
      return updatedUser;
    } catch (error) {
      throw new Error("Error resetting password.");
    }
  }
}

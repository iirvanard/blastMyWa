import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    return user;
  }

  async createUser(userData: { firstName: string; lastName: string; email: string; password: string }) {
    try {
      return await prisma.user.create({ data: userData });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new Error("Já existe um usuário com este e-mail.");
      }
      throw new Error("Erro ao criar usuário.");
    }
  }

  async updateUser(id: number, userData: { firstName?: string; lastName?: string; email?: string; password?: string }) {
    try {
      const updatedUser = await prisma.user.update({ where: { id }, data: userData });
      if (!updatedUser) {
        throw new Error("Usuário não encontrado.");
      }
      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new Error("Já existe um usuário com este e-mail.");
      }
      throw new Error("Erro ao atualizar usuário.");
    }
  }

  async deleteUser(id: number) {
    try {
      const deletedUser = await prisma.user.delete({ where: { id } });
      if (!deletedUser) {
        throw new Error("Usuário não encontrado.");
      }
      return deletedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Usuário não encontrado.");
      }
      throw new Error("Erro ao deletar usuário.");
    }
  }
}
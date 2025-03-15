import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { formatZodError } from '../utils/formatError';

export function errorHandler(
  error: Error | ZodError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Erro de validação do Zod
  if (error instanceof ZodError) {
    return res.status(400).json(formatZodError(error));
  }

  // Erros do Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Já existe um usuário com este e-mail.' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.status(500).json({ message: 'Erro no banco de dados.' });
  }

  // Erros personalizados
  if (error instanceof Error) {
    if (error.message === 'Usuário não encontrado.') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Já existe um usuário com este e-mail.') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }

  // Erro genérico
  res.status(500).json({ message: 'Erro interno no servidor.' });
}
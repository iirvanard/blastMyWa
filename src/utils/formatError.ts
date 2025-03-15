import { ZodError } from 'zod';

export function formatZodError(error: ZodError) {
  const errors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return {
    message: "Kesalahan validasi",
    errors,
  };
}
import cors from 'cors';

const allowedOrigins = [
  'https://meufrontend.com', // Frontend em produção
  'http://localhost:3000',   // Desenvolvimento
];

const corsMiddleware = cors({
  origin: allowedOrigins,
});

export default corsMiddleware;
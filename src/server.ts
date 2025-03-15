import express from "express";
import * as dotenv from "dotenv";
import helmetMiddleware from "./middlewares/helmetMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";
import { errorHandler } from './middlewares/errorHandler';
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://meufrontend.com', // Frontend em produção
  'http://localhost:3000',   // Desenvolvimento
];

// Middlewares
app.use(express.json());
app.use(helmetMiddleware);
app.use(corsMiddleware);

// Gunakan semua routes yang telah digabungkan
app.use("/api", routes);

// Middleware de tratamento de erros (DEVE SER O ÚLTIMO MIDDLEWARE)
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(error, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
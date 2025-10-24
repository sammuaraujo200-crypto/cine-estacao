import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import http from "http";
import moviesRouter from "./movies"; // importa a rota
import cron from "node-cron";
import axios from "axios";


const app = express();

// Permite acessar o corpo cru da requisição (útil para webhooks, etc)
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(moviesRouter);


// Middleware de log
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Função assíncrona principal
(async () => {
  // Registra as rotas da API
  registerRoutes(app);

  // Cria o servidor HTTP com o app do Express
  const server = http.createServer(app);

  // Middleware de erro global
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Setup do Vite (modo dev) ou arquivos estáticos (modo produção)
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Configuração do servidor
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.HOST || "localhost";

  server.listen(port, host, () => {
    log(`✅ Server running at http://${host}:${port}`);
  });
  // 🕒 CRON JOB: Atualiza os filmes toda quinta-feira às 5h da manhã
  cron.schedule("0 5 * * 4", async () => {
    log("🕓 Atualizando filmes automaticamente...");
    try {
      await axios.get(`http://${host}:${port}/api/movies/batch`);
      log("✅ Atualização de filmes concluída!");
    } catch (err) {
      log("❌ Erro ao atualizar filmes automaticamente:");
      console.error(err);
    }
  });
})();

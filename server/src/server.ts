import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRoutes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

// Trust proxy for secure reverse proxy deployments (Render, Vercel, Nginx, AWS, Railway)
app.set("trust proxy", 1);

// Security & CORS
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const configuredOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const devOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        configuredOrigins.includes(origin) ||
        configuredOrigins.includes("*") ||
        (process.env.NODE_ENV !== "production" && (
          devOrigins.includes(origin) ||
          /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
        ))
      ) {
        callback(null, true);
      } else if (configuredOrigins.length === 0) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// Rate Limiter
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === "production" ? 1000 : 5000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests, please try again later." },
  })
);

// Compression
app.use(compression());

// Body Parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Swagger Documentation
setupSwagger(app);

// Root & Health Endpoints
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Blackcoffer Dashboard API is running",
    endpoints: {
      health: "/health",
      documentation: "/api-docs",
      insights: "/api/insights",
      filters: "/api/filters",
      stats: "/api/stats",
    },
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// API Routes
app.use("/api", apiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Centralized Error Handler
app.use(errorHandler);

// Database Connection & Server Listener
if (process.env.NODE_ENV !== "test") {
  if (!MONGO_URI) {
    console.error("FATAL: MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
      const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
      });

      // Graceful shutdown handling for container and cloud deployments
      const handleShutdown = (signal: string) => {
        console.log(`Received ${signal}. Gracefully closing server...`);
        server.close(async () => {
          try {
            await mongoose.connection.close();
            console.log("MongoDB connection closed.");
            process.exit(0);
          } catch (err) {
            console.error("Error closing MongoDB connection:", err);
            process.exit(1);
          }
        });
      };

      process.on("SIGTERM", () => handleShutdown("SIGTERM"));
      process.on("SIGINT", () => handleShutdown("SIGINT"));
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
      process.exit(1);
    });
}

export default app;

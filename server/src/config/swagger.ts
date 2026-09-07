import swaggerJsdoc from "swagger-jsdoc";
import { Application } from "express";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blackcoffer Dashboard API",
      version: "1.0.0",
      description: "Backend API for the data visualization dashboard",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./dist/routes/*.js", "./dist/controllers/*.js"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

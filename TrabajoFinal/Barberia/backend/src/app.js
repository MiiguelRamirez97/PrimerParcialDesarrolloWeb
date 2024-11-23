import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import cors from "cors";

import { setContentType } from "./middlewares/middleware.mjs";

import { BarberRoutes } from "./routes/BarberRoutes.mjs";
import { ClientRoutes } from "./routes/ClientRoutes.mjs";
import { UserRoutes } from "./routes/UserRoutes.mjs";

const app = express();
app.use(cors());

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Barber API",
        description: "A sample API",
        version: "1.0.0",
      },
    },
    apis: ["./routes/*.mjs"],
  };

const spec = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

app.get("/api-docs.json", (req, res) => {
  res.send(spec);
});

app.use(express.json());
app.use(setContentType);

const barberRoutes = new BarberRoutes();
const clientRoutes = new ClientRoutes();
const userRoutes = new UserRoutes();

app.use("/barbers", barberRoutes.router);
app.use("/clients", clientRoutes.router);
app.use("/users", userRoutes.router);

app.all("*", (req, res) => {
    res.status(404).send(JSON.stringify({ message: "invalid path" }));
  });
  
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send("Something broke!");
});

app.listen(8080, () => {
console.log("Servidor escuchando en el puerto 8080");
});
import express from "express";
import routes from "./router";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(routes);
app.use(errorHandler);

export default app;

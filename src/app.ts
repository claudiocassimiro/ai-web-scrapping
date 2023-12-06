import express from "express";
import routes from "./router";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

export default app;

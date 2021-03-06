import "colors";
import "express-async-errors";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import connectDB from "./database";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import routes from "./routes";

connectDB();

const app = express();
const PORT = process.env.PORT || 3333;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server is in ${process.env.NODE_ENV} mode and up on port ${PORT}`.green
      .bold
  )
);

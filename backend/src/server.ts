import express from "express";
import routes from "./routes";
import cors from "cors";
import connectDB from "./database";

connectDB();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());

app.use("/api", routes);

app.listen(PORT, () =>
  console.log(
    `Server is in ${process.env.NODE_ENV} mode and up on port ${PORT}`
  )
);

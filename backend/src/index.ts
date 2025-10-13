import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { router } from "./Controller/ControllerContact";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/contacts", router);
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});
const PORT = process.env.PORT;
app.listen(PORT);

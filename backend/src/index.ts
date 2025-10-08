import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import tasksContacts from "./routes/Contacts";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/contacts", tasksContacts);
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server rodando em http://localhost:${PORT}`)
);

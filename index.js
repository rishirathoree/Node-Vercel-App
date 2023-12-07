import express from "express";
const app = express();
import todosRouter from "./Routes/Todos.js";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const loc = path.join(__dirname,'uploads')

app.use(cors());
app.use(bodyParser.json());
app.use("/", todosRouter);
app.use('/images',express.static(loc))

mongoose
  .connect(
    "mongodb+srv://tanishkapatil295:tanishkapatil295@cluster0.lu7mq9v.mongodb.net/Scheduler?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    clg;
    err;
  });

app.listen(8000, () => {
  console.log("server running");
});

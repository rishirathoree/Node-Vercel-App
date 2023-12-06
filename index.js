import express from "express";
const app = express();
import todosRouter from "./Routes/Todos.js";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

app.use(cors());
app.use(bodyParser.json());
app.use("/", todosRouter);

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

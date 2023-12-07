import { Router } from "express";
import {
  CreateTodos,
  DeleteTodos,
  GetSingleDetails,
  GetTodos,
  UpdateTodos,
} from "../Controllers/Todos.js";
import { AuthenticateSomeone, CreateAuthentication } from "../Controllers/CreateUsers.js";
import upload from "../Middleware/multer-config.js";

const router = Router();

router
  .post("/", CreateTodos)
  .get("/:id", GetSingleDetails)
  .get("/", GetTodos)
  .put("/", UpdateTodos)
  .delete("/:id", DeleteTodos)
  .post('/create-user',upload.array('images',1),CreateAuthentication)
  .post('/login',AuthenticateSomeone)


export default router;

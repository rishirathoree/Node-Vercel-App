import { Router } from "express";
import { CreateTodos, DeleteTodos, GetTodos, UpdateTodos } from "../Controllers/Todos.js";

const router = Router()

router.post('/',CreateTodos).get('/',GetTodos).put('/',UpdateTodos).delete('/:id',DeleteTodos)


export default router;
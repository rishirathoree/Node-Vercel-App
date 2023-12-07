import { Router } from "express";
import { CreateTodos, DeleteTodos, GetSingleDetails, GetTodos, UpdateTodos } from "../Controllers/Todos.js";

const router = Router()

router.post('/',CreateTodos).get('/:id',GetSingleDetails).get('/',GetTodos).put('/',UpdateTodos).delete('/:id',DeleteTodos)


export default router;
import mongoose from "mongoose"
import Todos from "../Model/Todos.js"

export const CreateTodos = async(req,res) => {
    const { title, description} = req.body
    
    try {
        const creatingNewTodos = await new Todos({
            title,
            description,
        })
        await creatingNewTodos.save()
        return res.send('todos create')
    } catch (error) {
        console.log(error.name)
    }
}

export const GetTodos = async(req,res) => {
    try {
        const Tod = await Todos.find()
        return res.json({msg:'success',success:1,todos:Tod})
    } catch (error) {
        throw error
    }
}



export const GetSingleDetails = async (req, res) => {
    try {
        const getSingleTodo = await Todos.findOne({ _id: req.params.id });

        if (!getSingleTodo) {
            return res.status(200).json({ success:0,message: 'Todo not found, not sending the correct _id key value' });
        }

        res.status(200).json({msg:`succesfully got the todos with id ${req.params.id}`,success:1, todo:getSingleTodo});
    } catch (error) {
        res.status(200).json({ success:0,message: 'Internal Server Error' });
    }
};
export const UpdateTodos = async (req,res) => {
    const { completed,id } = req.body
    try {
        const findTodo = await Todos.findOne({_id:id})
        findTodo.completed = completed
        await findTodo.save()
        const findtodss = await Todos.findOne({_id:id})
        return res.json({msg:'successfully updated',success:1,todoUpdateStatus:findtodss})
    } catch (error) {
        throw error
    }
}

export const DeleteTodos = async (req, res) => {
    console.log(req.params, 'req.params.id');
    try {
        const findTodosToDlt = await Todos.findByIdAndDelete({_id:req.params.id});
        console.log(findTodosToDlt)
        if (!findTodosToDlt) {
            return res.status(200).json({ msg:'users not found you want to delete',success:0 });
        }

        return res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

import express from "express";
import { createUsers, getUsers, updateStatus, updateUser } from "../services/users-services";
import { UserData, UserStatus, userSchema, userStatusSchema } from "../models/user";
import { validationMiddleware } from "../middlewares/middlewares";
import { ZodError } from "zod";

//CAPA DE PRESENTACION
const usersRouter = express.Router();
usersRouter.get("/", (_req, res) => {
try {
    const users = getUsers();
    res.json(users);
} catch (error) {
    res.status(500).send("Error al obtener los usuarios");
}
});

usersRouter.post("/",validationMiddleware(userSchema), async (req, res) => {
    try {
        
        const result = userSchema.safeParse(req.body); //validacion de datos con schema de zod
        if(!result.success){
            result.error.format(); //para ver los zoderrors formateados
            res.status(400).send(result.error.format());
            return;
        }
        const userData: UserData = req.body;
        const newUser = await createUsers(userData); //funcion en capa services
        res.status(201).json(newUser);
    } catch (error) {
    
        if(error instanceof ZodError){
            res.status(400).send(error.errors);
        }else{
            res.status(500).send("Error al crear usuario");
        }
    
    }
});

usersRouter.put("/:id",validationMiddleware(userSchema), async (req, res) => {
    try {
        const id = parseInt(req.params['id']);
        const userData: UserData = req.body;
        const user = await updateUser(id, userData);
        res.json(user);
        console.log(user);
    } catch (error) {
        res.status(500).send("Error al actualizar usuario");
    }
});

usersRouter.delete("/:id",validationMiddleware(userStatusSchema), async (req, res) => {
    try {
        const id = parseInt(req.params['id']);
        const userData: UserStatus = req.body;
        const user = await updateStatus(id, userData);
        res.json(user);
    } catch (error) {
    
        res.status(500).send("Error al actualizar status de usuario");
    }
});

export default usersRouter;
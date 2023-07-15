//? Dependencies
import dotenv from 'dotenv';
import { Router } from 'express';
import { USERS } from '../db.js'
import proxyUsers from '../middleware/proxyUsers.js';

//? Enviroment Variables
dotenv.config('../');

const storageUsers = Router();

//* Obtener los detalles de un usuario 
storageUsers.get('/:_id', proxyUsers, (req, res) => {
    const { _id } = req.params;
    const user = USERS.find((user) => user._id === _id);
    
    if(!user) {
        res.status(404).send("No se puede encontrar el usuario");
    } else {
        res.send(JSON.stringify(user));
    }
})

//* Crear una cuenta
storageUsers.post('', proxyUsers, (req, res) => {
    const { _id, name } = req.body;
    const user = USERS.find((user) => user._id === _id);

    if(!_id || !name) res.status(400).send("ERROR CONEXION");

    if(user) {
        return res.status(409).send("El usuario ya existe");
    } else {
        USERS.push({_id, name});
        return res.send("Usuarios agregados")
    }


})

//* Actualizar una cuenta
storageUsers.patch('/:_id', proxyUsers, (req, res) => {
    const { _id } = req.params;
    const { name } = req.body;

    if(!name) {
        res.status(400).send("El nombre no existe")
    } 
    const user = USERS.find((user) => user._id === _id);
    
    if(!user) {
        res.status(404).send("No se puede encontrar el usuario");
    } else {
       user.name = name;
       res.send("Usuario actualizado correctamente")
    }
})

//* Eliminar una cuenta
storageUsers.delete('/:_id', proxyUsers, (req, res) => {
    const { _id } = req.params;
    const userIndex = USERS.findIndex((user) => user._id = _id);

    if(userIndex == -1) {
        res.status(404).send("No se puede encontrar el usuario");
    } else {
        USERS.splice(userIndex, 1);
        res.send("Usuario eliminado")
    }
})

export default storageUsers;
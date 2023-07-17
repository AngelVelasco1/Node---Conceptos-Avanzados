//? Dependencies
import { Router } from 'express';
import { USERS } from '../db.js'

const storageAuth = Router();

//? Authentication Function
const auth = (email, password) => {
    const user = USERS.find((user) => user.email === email);

    if (!email || !password) {
        return { success: false, message: "Bad information send" }
    }
    if (!user) {
        return { success: false, message: "Unauthorized" }
    }
    if (user.password !== password) {
        return { success: false, message: "Unauthorized" }
    }

    return { success: true, message: "Authorized", user }
}

//? Endpoint publico (Sin autenticacion ni autorizacion)
storageAuth.get('/public', (req, res) => {
    res.send("Endpoint publico, robese todo")
})

//? Endpoint con autenticacion
storageAuth.post('/authentication', (req, res) => {
    const { email, password } = req.body;
    const authResult = auth(email, password);

    switch (authResult.success || authResult.message) {
        case true:
            res.send(`The user ${authResult.user.name} is authenticated`);
            break;
        case false || "Bad information send":
            res.status(400).send(authResult.message);
            break;
        default:
            res.status(401).send(authResult.message);
            break;
    }
})

//? Endpoint con autorizacion
storageAuth.post('/authorization', (req, res) => {
    const { email, password } = req.body;
 
    try {
        const authResult = auth(email, password);
        if(!authResult.success) return res.status(400).send(authResult.message);
        if (authResult.user.rol !== "admin") return res.send(403);
        
        return res.send(`El usuario ${authResult.user.name} esta autorizado, es admin`);
    }
    catch (err) {
        return res.status(401)
    }
})

export default storageAuth;
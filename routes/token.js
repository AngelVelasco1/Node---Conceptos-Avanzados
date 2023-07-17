//? Dependencies
import { Router } from 'express';
import { USERS } from '../db.js'

const storageToken = Router();

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


//? Endpoint Login
storageToken.post('/login', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.sendStatus(400);

    try {
        const authResult = auth(email, password);
        return res.send(`Usuario ${authResult.user.name} autenticado`)

    } catch(err) {
        return res.sendStatus(401);
    }


  
})
//? Authentication with token


export default storageToken;
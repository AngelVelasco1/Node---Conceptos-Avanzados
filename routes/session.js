//? Dependencies
import { Router } from 'express';
import { USERS } from '../db.js'
import { nanoid } from 'nanoid';

const sessions = [];
const storageSession = Router();

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
storageSession.post('/login', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.sendStatus(400);

    
    try {
        const { guid } = auth(email, password);

        const sessionId = nanoid();
        sessions.push({ sessionId, guid });

        res.cookie("sessionId", sessionId, {
            httpOnly: true
        });  
        return res.send({message: "Usuario autenticado"});
    } 
    catch(err) {
        return res.sendStatus(401);
    }

})
//? Authentication with session
storageSession.get('/getCookie', (req, res) => {
    const { cookies } = req;
    if(!cookies.sessionId) return res.sendStatus(401);

    const userSession = sessions.find((session) => session.sessionId === cookies.sessionId);
    if(!userSession) return res.sendStatus(401);

    const user = USERS.find((user) => user.guid === userSession.guid);
    if(!user) return res.sendStatus(401);

    delete user.password;
    return res.send(user);
})

export default storageSession;


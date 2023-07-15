//? Dependencies
import express from 'express';

const proxyUsers = express();

//? Middleware que verifica si existe un token de autenticacion antes de ejecutar las consultas
proxyUsers.use((req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token) return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
        next();
    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.status(500);
    }
})

export default proxyUsers;
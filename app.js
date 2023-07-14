// ?Dependencies
import express from 'express';

const app = express();
app.use(express.json());


//? Server
const config = {
    hostname: "localhost",
    port: 8080
}
express.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})
import express from 'express';
import router from './routes.js';
// CORS
import fs from 'fs';
import https from 'https';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // CORS
app.use(router);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// CORS
https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3001, () => console.log("Rodando em HTTPS"));

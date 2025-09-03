import { Router } from "express";
import {selectPessoas, selectPessoa, deletePessoa, insertPessoa, updatePessoa } from './Controllers/pessoa.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "message": "API, funcionando"
    })
})

router.get('/pessoas', selectPessoas)
router.get('/pessoa/:id', selectPessoa)
router.post('/pessoa', insertPessoa)
router.put('/pessoa/:id', updatePessoa)
router.delete('/pessoa/:id', deletePessoa)

export default router;
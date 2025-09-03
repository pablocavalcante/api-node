import { openDb } from '../configDB.js';

export const createTable = async () => {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Pessoa (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade INTEGER        
        )
    `);
    console.log('Tabela criada com sucesso!');
};

// Listar Pessoas
export const selectPessoas = async (req, res) => {
    const db = await openDb();
    const pessoas = await db.all('SELECT * FROM Pessoa');
    res.json(pessoas);
}

// Listar 1 Pessoa
export const selectPessoa = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await openDb();
        const pessoa = await db.get('SELECT * FROM Pessoa WHERE id=?', [id]);

        if(!pessoa){
            return res.status(404).json({statusCode: 404, message: `Pessoa ${id} não encontrada`})
        }

        res.json(pessoa);

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

// Deletar
export const deletePessoa = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id){
            res.status(400).json({ message: `ID não fornecido!`});
        }

        const db = await openDb();
        const result = await db.run('DELETE FROM Pessoa WHERE id=?', [id]); 

        if(result.changes === 0){
            return res.status(404).json({ message: `Pessoa com ID ${id} não encontrada`})
        }

        res.json({ message: `Pessoa com ID ${id} deletada com sucesso!` });

    } catch (err){
        console.log(err)
        res.status(500).json({ message: "Erro interno no servidor"});
    }
};

// Inserir
export const insertPessoa = async (req, res) => {
    try {
        const { nome, idade } = req.body;

        if(!nome || !idade) {
            res.status(400).json({statusCode: 400, message: "Informe nome e idade"})
        }

        const db = await openDb();
        const result = await db.run(`INSERT INTO Pessoa (nome, idade) VALUES (?, ?)`, [nome, idade]);

        res.json({ 
            message: `Pessoa ${nome} inserida com sucesso!`,
            id: result.lastID
        });

    }  catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erro interno no servidor"});
    }
}; 

// Atualizar
export const updatePessoa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Você precisa informar um id" });
        }

        const db = await openDb();
        const result = await db.run(
            'UPDATE Pessoa SET nome=?, idade=? WHERE id=?',
            [nome, idade, id]
        );

        if (result.changes === 0) {
            return res.status(404).json({ message: `Pessoa ${id} não encontrada` });
        }

        res.json({
            message: `Pessoa ${id} atualizada com sucesso!`
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};






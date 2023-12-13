const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors'); // Adicionando o pacote CORS
const shortid = require('shortid');

// Adicionando middleware CORS
server.use(cors());

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Rota para lidar com solicitações de registro
server.post('/register', (req, res) => {
    // Lógica para adicionar um novo usuário ao seu arquivo db.json
    const newUser = req.body;
    // ... (lógica para adicionar newUser ao seu banco de dados)
    // Envie uma resposta adequada
    res.json({ message: 'Usuário registrado com sucesso!' });
});

server.post('/cadastrar-paciente', (req, res) => {
    try {
        const formData = req.body;

        const leitoOcupado = router.db.get('leitos').find({ numero: formData.leito, ocupado: true }).value();
        if (leitoOcupado) {
            return res.status(400).json({ error: 'O leito selecionado já está ocupado.' });
        }

        // Atualizar o estado do leito para ocupado
        router.db.get('leitos').find({ numero: formData.leito }).assign({ ocupado: true }).write();

        // Adicionar o paciente aos dados existentes
        formData.id = shortid.generate();
        router.db.get('pacientes').push(formData).write();

        // Atualizar os dados em tempo real
        const leitosData = router.db.get('leitos').value();
        res.json({ message: 'Paciente cadastrado com sucesso!', leitos: leitosData });
    } catch (error) {
        console.error('Erro durante o cadastro do paciente:', error);
        res.status(500).json({ error: 'Erro durante o cadastro do paciente.' });
    }
});

server.use(router);
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
});

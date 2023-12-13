const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Defina o caminho para os arquivos estáticos (HTML, CSS, JS).
app.use(express.static(path.join(__dirname, 'public')));


// Rota para a página inicial.html
app.get('/paginainicial', (req, res) => {
    res.sendFile(__dirname + '/public/paginainicial.html');
  });

// Roteamento para mercadorias.html
app.get('/mercadorias', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/mercadorias.html'));
});

// Roteamento para relatorio.html
app.get('/relatorio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/relatorio.html'));
});

// Roteamento para inventario.html
app.get('/inventario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/inventario.html'));
});

app.listen(port, () => {
  console.log(`Servidor Node.js rodando na porta ${port}`);
});

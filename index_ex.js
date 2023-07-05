require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const pessoaRota = require('./rotas/pessoa');
const authRota = require('./rotas/auth');
const userRota = require('./rotas/user'); // Nova rota de usuário
const sequelize = require('./db');

app.use('/pessoas', pessoaRota); // Rota de pessoas
app.use('/auth', authRota); // Rota de autenticação
app.use('/user', userRota); // Rota de usuário

// Sincronizar o modelo Sequelize com a base de dados
sequelize.sync().then(() => {
  console.log('Conexão com a base de dados estabelecida com sucesso!');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('Erro ao estabelecer conexão com a base de dados:', error);
});


const User = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, email, password, first_name, last_name, date_of_birth, address, city, country, phone_number } = req.body;

  try {
    console.log("\n",'A registar o utilizador:', username);

    // Verifica se o utilizador já existe na base de dados
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      console.log('Esse utilizador já existe');
      return res.status(409).send({ message: 'Esse utilizador já existe' });
    }

    // Faz o hash da password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo utilizador na base de dados
    const newUser = await User.create(
      {
        username,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        date_of_birth,
        address,
        city,
        country,
        phone_number
      }
    );

    console.log('Utilizador registado com sucesso');
    return res.status(201).send({ message: 'Utilizador registado com sucesso' });
  } catch (error) {
    console.error('Erro durante o registo do utilizador:', error);
    return res.status(500).send({ message: 'Erro durante o registo do utilizador' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Tentando fazer login com as credenciais:', username, password);

    // Verifique as credenciais na base de dados
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log('Credenciais inválidas');
      return res.status(401).send({ message: 'Credenciais inválidas' });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Credenciais inválidas');
      return res.status(401).send({ message: 'Credenciais inválidas' });
    }

    console.log('Autenticação bem-sucedida');
    return res.status(200).send({ message: 'Autenticação bem-sucedida' });
  } catch (error) {
    console.error('Erro durante a autenticação:', error);
    return res.status(500).send({ message: 'Erro durante a autenticação' });
  }
};

module.exports = {
  register,
  login
};

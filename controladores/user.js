const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const generateAndSendVerification = async (user) => {
  try {
    // Gera um novo código de verificação
    const verificationCode = generateVerificationCode();

    // Armazena o código de verificação na base de dados
    user.cod_verify = verificationCode;
    await user.save();

    // Envia o email de verificação
    await sendVerificationEmail(user.email, verificationCode);

    console.log('Email de verificação enviado com sucesso');
  } catch (error) {
    console.error('Erro ao gerar o código de verificação e enviar o email:', error);
    throw error;
  }
};

const edit = async (req, res) => {
  const { id } = req.params; // ID do utilizador a ser editado
  const { username, password, first_name, last_name, address, city, country, phone_number, date_of_birth} = req.body;

  try {
    console.log('Editando utilizador:', id);

    // Verifica se o utilizador existe na base de dados
    const user = await User.findByPk(id);

    if (!user) {
      console.log('Utilizador não encontrado');
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    // Atualiza os campos do utilizador
    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.first_name = first_name;
    user.last_name = last_name;
    user.address = address;
    user.city = city;
    user.country = country;
    user.phone_number = phone_number;
    user.date_of_birth = date_of_birth;

    console.log('Utilizador atualizado com sucesso');
    return res.status(200).send({ message: 'Utilizador atualizado com sucesso' });
  } catch (error) {
    console.error('Erro durante a edição do utilizador:', error);
    return res.status(500).send({ message: 'Erro durante a edição do utilizador' });
  }
};

// Função para gerar um código de verificação aleatório
function generateVerificationCode() {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

// Função para enviar o email de verificação
async function sendVerificationEmail(email, verificationCode) {
  try {
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ed58cc37ad0446",
        pass: "e372d92e6a848d"
      }
    });

    const message = {
      from: 'pedro.estagio.2023@gmail.com',
      to: email,
      subject: 'Código de Verificação',
      text: `Seu código de verificação é: ${verificationCode} \nEste email é um email automático NÃO RESPONDA!!`
    };

    await transport.sendMail(message);
    console.log('Email de verificação enviado para', email);
  } catch (error) {
    console.error('Erro ao enviar o email de verificação:', error);
  }
}

const updateEmail = async (req, res) => {
  const { id } = req.params; // ID do utilizador a ser editado
  const { verificationCode, newEmail } = req.body;

  try {
    console.log('Atualizando email do utilizador:', id);

    // Verifica se o utilizador existe na base de dados
    const user = await User.findByPk(id);

    if (!user) {
      console.log('Utilizador não encontrado');
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    // Verifica se o código de verificação está correto
    if (user.cod_verify !== verificationCode) {
      console.log('Código de verificação inválido');
      return res.status(400).send({ message: 'Código de verificação inválido' });
    }

    // Atualiza o email do utilizador
    user.email = newEmail;
    user.cod_verify = null; // Limpa o código de verificação

    // Salva as alterações na base de dados
    await user.save();

    console.log('Email do utilizador atualizado com sucesso');
    return res.status(200).send({ message: 'Email do utilizador atualizado com sucesso' });
  } catch (error) {
    console.error('Erro durante a atualização do email do utilizador:', error);
    return res.status(500).send({ message: 'Erro durante a atualização do email do utilizador' });
  }
};

module.exports = {
  edit,
  updateEmail, 
  generateAndSendVerification
};

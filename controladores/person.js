const { Person } = require('../models/person');
// Criar uma pessoa - POST
const createPerson = async (req, res) => {
  const { nome, apelido, morada, telefone, data_nascimento, profissao } = req.body;

  if (!nome) {
    return res.status(400).send({ message: 'Propriedade nome em falta!' });
  }
  if (!apelido) {
    return res.status(400).send({ message: 'Propriedade apelido em falta!' });
  }
  if (!morada) {
    return res.status(400).send({ message: 'Propriedade morada em falta!' });
  }
  if (!telefone) {
    return res.status(400).send({ message: 'Propriedade telefone em falta!' });
  }
  if (!data_nascimento) {
    return res.status(400).send({ message: 'Propriedade da data_nascimento em falta!' });
  }
  if (!profissao) {
    return res.status(400).send({ message: 'Propriedade profissao em falta!' });
  }

  try {
    console.log('\nA registar a pessoa:', nome, apelido);

    // Cria uma nova pessoa na base de dados
    const newPerson = await Person.create({
      nome,
      apelido,
      morada,
      telefone,
      data_nascimento,
      profissao
    });

    console.log('Pessoa criada com sucesso');
    return res.status(201).send({ message: 'Pessoa criada com sucesso' });
  } catch (error) {
    console.error('Erro durante a criação da pessoa:', error);
    return res.status(500).send({ message: 'Erro durante a criação da pessoa' });
  }
};
// Listar todas as pessoas - GET
const listPerson = async (res) => {
  try {
    console.log('\nA visualizar todas as pessoas');
    const person = await Person.findAll();
    res.json(person);
  } catch (error) {
    console.error('Erro ao listar as pessoas:', error);
    res.status(500).json({ error: 'Erro ao listar as pessoas' });
  }
};
// Visualizar uma pessoa específica pelo ID - GET
const viewPerson = async (req, res) => {
  const { id } = req.params;
  try {
    console.log('\nA visualizar a pessoa:', id);
    const person = await Person.findByPk(id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao listar pessoa:', error);
    res.status(500).json({ error: 'Erro ao listar pessoa' });
  }
};
// Editar uma pessoa pelo ID - PUT
const editPerson = async (req, res) => {
  const { id } = req.params; // Obtém o ID do parâmetro da URL
  const { nome, apelido, morada, telefone, data_nascimento, profissao } = req.body; // Obtém os dados a serem atualizados

  try {
    console.log('\nA editar a pessoa:', id);
    const person = await Person.findByPk(id);
    if (person) {
      // Atualiza os dados da pessoa
      person.nome = nome;
      person.apelido = apelido;
      person.morada = morada;
      person.telefone = telefone;
      person.data_nascimento = data_nascimento;
      person.profissao = profissao;
      await person.save();

    console.log('Pessoa editada com sucesso');
    return res.status(201).send({ message: 'Pessoa editada com sucesso' });
    } else {
      console.log('Pessoa não encontrada');
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao editar pessoa:', error);
    res.status(500).json({ error: 'Erro ao editar pessoa' });
  }
};
// Remover uma pessoa pelo ID - DELETE
const removePerson = async (req, res) => {
  const { id } = req.params; // Obtém o ID do parâmetro da URL

  try {
    console.log('\nA eliminar a pessoa:', id);
    const person = await Person.findByPk(id);
    if (person) {
      await person.destroy();
      res.json({ message: 'Pessoa excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao excluir pessoa:', error);
    res.status(500).json({ error: 'Erro ao excluir pessoa' });
  }
};
module.exports = {
  createPerson,
  listPerson,
  viewPerson,
  editPerson,
  removePerson,
};

let people = [];
let contador = 1;

// Criar uma pessoa
const createPessoa = (req, res) => {
  let pessoa = {};
  pessoa.id = contador;

  if (req.body.hasOwnProperty('nome')) {
    pessoa.nome = req.body.nome;
  } else {
    return res.status(400).send({ message: 'Propriedade nome em falta!' });
  }

  if (req.body.hasOwnProperty('idade')) {
    pessoa.idade = req.body.idade;
  } else {
    return res.status(400).send({ message: 'Propriedade idade em falta!' });
  }

  if (req.body.hasOwnProperty('genero')) {
    pessoa.genero = req.body.genero;
  } else {
    return res.status(400).send({ message: 'Propriedade genero em falta!' });
  }

  people.push(pessoa);
  contador++;
  console.log('Tamanho da lista: ' + people.length);
  return res.status(201).send({ message: 'Pessoa criada com sucesso' });
};

// Listar todas as pessoas
const listPessoas = (req, res) => {
  res.json(people);
};

// Visualizar uma pessoa específica pelo ID
const viewPessoa = (req, res) => {
  const { id } = req.params;
  const pessoa = people.find((p) => p.id === parseInt(id, 10));
  if (pessoa) {
    res.json(pessoa);
  } else {
    res.status(404).send({ message: 'Pessoa não encontrada' });
  }
};

// Editar uma pessoa pelo ID
const editPessoa = (req, res) => {
  const { id } = req.params;

  // Verifica se a pessoa existe
  const pessoa = people.find((p) => p.id === parseInt(id, 10));
  if (!pessoa) {
    return res.status(404).send({ message: 'Pessoa não encontrada' });
  }

  // Atualiza os dados da pessoa
  if (req.body.nome) {
    pessoa.nome = req.body.nome;
  }
  if (req.body.idade) {
    pessoa.idade = req.body.idade;
  }
  if (req.body.genero) {
    pessoa.genero = req.body.genero;
  }

  return res.send({ message: 'Dados da pessoa atualizados com sucesso' });
};

// Remover uma pessoa pelo ID
const removePessoa = (req, res) => {
  const { id } = req.params;

  // Verifica se a pessoa existe
  const index = people.findIndex((p) => p.id === parseInt(id, 10));
  if (index === -1) {
    return res.status(404).send({ message: 'Pessoa não encontrada' });
  }

  // Remove a pessoa
  const remove = people.splice(index, 1);

  return res.send({ message: 'Pessoa removida com sucesso', pessoa: remove });
};

module.exports = {
  createPessoa,
  listPessoas,
  viewPessoa,
  editPessoa,
  removePessoa,
};

const { Person } = require('../models/person');
const {VascularAcess } = require('../models/VascularAcess');

// Criar um novo acesso vascular para uma pessoa - POST
const createVascularAcess = async (req, res) => {
  const { personId } = req.params;
  const { descricao, position, observacoes } = req.body;

  try {
    const pessoa = await Person.findByPk(personId);
    if (!pessoa) {
      console.log('Pessoa não encontrada\n');
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }

    console.log('A criar um novo acesso vascular para a pessoa:', personId);
    const novoAcessoVascular = await VascularAcess.create({
      descricao,
      position,
      observacoes,
    });

    // Associe o acesso vascular criado à pessoa e guarde o resultado na variável vascularAccessPersonAssoc
    const vascularAccessPersonAssoc = await pessoa.addVascularAcess(novoAcessoVascular);

    // Obtém os IDs associados na tabela PersonVascularAccess
    const acessosVascularesId = vascularAccessPersonAssoc.id;
    const pessoaId = vascularAccessPersonAssoc.PersonId;

    console.log('Acesso vascular criado com sucesso\n');
    console.log('ID do acesso vascular:', acessosVascularesId);
    console.log('ID da pessoa:', pessoaId);

    return res.status(201).send({ message: 'Acesso vascular criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar o acesso vascular:', error, '\n');
    return res.status(500).send({ error: 'Erro ao criar o acesso vascular' });
  }
};
// Listar todos os acessos vasculares de uma pessoa - GET
const listVascularAcess = async (req, res) => {
  const { personId } = req.params;

  try {
    const pessoa = await Person.findByPk(personId, {
      include: {
        model: VascularAcess,
        attributes: ['id', 'descricao', 'position', 'observacoes'],
        through: {
          attributes: [] // Não incluir as colunas da tabela acessosVascularesPerson
        }
      },
      attributes: ['id', 'nome', 'apelido', 'morada', 'telefone', 'data_nascimento', 'profissao'], // Selecionar os campos da pessoa
      order: [[VascularAcess, 'position', 'ASC']] // Ordenar os acessos vasculares pelo campo "position"
    });

    if (!pessoa) {
      console.log('Pessoa não encontrada\n');
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }

    console.log('A visualizar os acessos vasculares da pessoa:', personId, '\n');
    return res.json(pessoa);
  } catch (error) {
    console.error('Erro ao listar os acessos vasculares:', error, '\n');
    return res.status(500).send({ error: 'Erro ao listar os acessos vasculares' });
  }
};
// Obter um acesso vascular específico de uma pessoa por ID - GET
const viewVascularAcess = async (req, res) => {
  const { personId, acessosVascularesId } = req.params;

  try {
    const pessoa = await Person.findByPk(personId, {
      include: {
        model: VascularAcess,
        where: { id: acessosVascularesId },
        attributes: ['id', 'descricao', 'position', 'observacoes'],
        through: {
          attributes: [] // Não incluir as colunas da tabela acessosVascularesPerson
        }
      },
      attributes: ['id', 'nome', 'apelido', 'morada', 'telefone', 'data_nascimento', 'profissao'], // Selecionar os campos da pessoa
      order: [[VascularAcess, 'position', 'ASC']] // Ordenar os acessos vasculares pelo campo "position"
    });

    if (!pessoa) {
      console.log('Pessoa não encontrada\n');
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }

    if (!pessoa.VascularAcesses || pessoa.VascularAcesses.length === 0) {
      console.log('Acesso vascular não encontrado ou não associado à pessoa\n');
      return res.status(404).send({ message: 'Acesso vascular não encontrado ou não associado à pessoa' });
    }

    console.log('A visualizar o acesso vascular da pessoa:', personId, '\n');
    return res.json(pessoa);
  } catch (error) {
    console.error('Erro ao obter o acesso vascular:', error, '\n');
    return res.status(500).send({ error: 'Erro ao obter o acesso vascular' });
  }
};
// Atualizar um acesso vascular específico de uma pessoa por ID - PUT
const updateVascularAcess = async (req, res) => {
  const { personId, acessosVascularesId } = req.params;
  const { descricao, position, observacoes} = req.body;

  try {
    const pessoa = await Person.findByPk(personId, {
      include: {
        model: VascularAcess,
        where: { id: acessosVascularesId },
        attributes: ['id', 'descricao', 'position', 'observacoes'],
        through: {
          attributes: [] // Não incluir as colunas da tabela intercorrenciaPerson
        }
      }
    });
    if (!pessoa) {
      console.log('Pessoa não encontrada\n');
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }

    const acessosVasculares = pessoa.VascularAcesses[0];

    if (!acessosVasculares) {
      console.log('Acesso vascular não encontrado ou não associado à pessoa\n');
      return res.status(404).send({ message: 'Acesso vascular não encontrado ou não associado à pessoa' });
    }

    // Atualize os valores da intercorrência com os valores do corpo da solicitação
    acessosVasculares.descricao = descricao;
    acessosVasculares.position = position;
    acessosVasculares.observacoes = observacoes;

    // Salve a intercorrência atualizada no banco de dados
    await acessosVasculares.save();

    console.log('Acesso vascular atualizado com sucesso\n');
    return res.status(201).send({ message: 'Acesso vascular atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o acesso vascular:', error, '\n');
    return res.status(500).send({ error: 'Erro ao atualizar o acesso vascular' });
  }
};
// Excluir um acesso vascular específico de uma pessoa por ID - DELETE
const removeVascularAcess = async (req, res) => {
  const { personId, acessosVascularesId } = req.params;

  try {
    // Verificar se a pessoa e o acesso vascular existem e estão associados
    const pessoa = await Person.findByPk(personId);
    const vascularAcess = await VascularAcess.findByPk(acessosVascularesId);

    if (!pessoa || !vascularAcess) {
      console.log('Pessoa ou acesso vascular não encontrado\n');
      return res.status(404).send({ message: 'Pessoa ou acesso vascular não encontrado' });
    }

    // Remover a associação entre a pessoa e o acesso vascular na tabela acessosVascularesPerson
    await pessoa.removeVascularAcess(vascularAcess);

    console.log('Acesso vascular removido com sucesso\n');
    return res.status(200).send({ message: 'Acesso vascular removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover o acesso vascular:', error, '\n');
    return res.status(500).send({ error: 'Erro ao remover o acesso vascular' });
  }
};
module.exports = {
  createVascularAcess,
  listVascularAcess,
  viewVascularAcess,
  updateVascularAcess,
  removeVascularAcess
};

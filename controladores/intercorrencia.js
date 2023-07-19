const { Person } = require('../models/person');
const { Intercorrencia } = require('../models/intercorrencia');

// Criar uma nova intercorrência para uma pessoa - POST
const createIntercorrencia = async (req, res) => {
  const { personId } = req.params;
  const { name, position } = req.body;

  try {
    const pessoa = await Person.findByPk(personId);
    if (!pessoa) {
      console.log('Pessoa não encontrada\n');
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }
    console.log('A criar uma nova prescrição para a pessoa:', personId);
    const novaPrescricao = await Intercorrencia.create({
      name,
      position,
    });

    // Associe a intercorrência criada à pessoa e guarde o resultado na variável intercorrenciaPersonAssoc
    const intercorrenciaPersonAssoc = await pessoa.addIntercorrencia(novaPrescricao);

    // Obtém os IDs associados na tabela intercorrenciaPerson
    const intercorrenciaId = intercorrenciaPersonAssoc.id;
    const pessoaId = intercorrenciaPersonAssoc.PersonId;

    console.log('Intercorrência criada com sucesso\n');
    console.log('ID da intercorrência:', intercorrenciaId);
    console.log('ID da pessoa:', pessoaId);

    return res.status(201).send({ message: 'Intercorrência criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar a intercorrência:', error, '\n');
    return res.status(500).send({ error: 'Erro ao criar a intercorrência' });
  }
};
// Listar todas as intercorrências de uma pessoa - GET
const listIntercorrencia = async (req, res) => {
  const { personId } = req.params;

  try {
    const pessoa = await Person.findByPk(personId, {
      include: {
        model: Intercorrencia,
        attributes: ['id', 'name', 'position'],
        through: {
          attributes: [] // Não incluir as colunas da tabela intercorrenciaPerson
        }
      },
      attributes: ['id', 'nome', 'apelido', 'morada', 'telefone', 'data_nascimento', 'profissao'], // Selecionar os campos da pessoa
      order: [[Intercorrencia, 'position', 'ASC']] // Ordenar as intercorrências pelo campo "position"
    });

    if (!pessoa) {
      console.log('Pessoa não encontrada\n');
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }

    console.log('A visualizar as intercorrências da pessoa:', personId, '\n');
    return res.json(pessoa);
  } catch (error) {
    console.error('Erro ao listar as intercorrências:', error, '\n');
    return res.status(500).send({ error: 'Erro ao listar as intercorrências' });
  }
};
// Obter uma intercorrência específica de uma pessoa por ID - GET
const viewIntercorrencia = async (req, res) => {
  const { personId, intercorrenciaId } = req.params;

  try {
    const pessoa = await Person.findByPk(personId, {
      include: {
        model: Intercorrencia,
        where: { id: intercorrenciaId },
        attributes: ['id', 'name', 'position'],
        through: {
          attributes: [] // Não incluir as colunas da tabela intercorrenciaPerson
        }
      },
      attributes: ['id', 'nome', 'apelido', 'morada', 'telefone', 'data_nascimento', 'profissao'], // Selecionar os campos da pessoa
      order: [[Intercorrencia, 'position', 'ASC']] // Ordenar as intercorrências pelo campo "position"
    });

    if (!pessoa) {
      console.log('Pessoa não encontrada\n');
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }

    console.log('A visualizar as intercorrências da pessoa:', personId, '\n');
    return res.json(pessoa);
  } catch (error) {
    console.error('Erro ao listar as intercorrências:', error, '\n');
    return res.status(500).send({ error: 'Erro ao listar as intercorrências' });
  }
};
// Atualizar uma intercorrência específica de uma pessoa por ID - PUT
const updateIntercorrencia = async (req, res) => {
  const { personId, intercorrenciaId } = req.params;
  const { name, position } = req.body;

  try {
    const pessoa = await Person.findByPk(personId, {
      include: {
        model: Intercorrencia,
        where: { id: intercorrenciaId },
        attributes: ['id', 'name', 'position'],
        through: {
          attributes: [] // Não incluir as colunas da tabela intercorrenciaPerson
        }
      }
    });
    if (!pessoa) {
      console.log('Pessoa não encontrada\n');
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }

    const intercorrencia = pessoa.Intercorrencia[0]; // Como estamos buscando apenas uma intercorrência, podemos acessá-la diretamente na posição 0.

    if (!intercorrencia) {
      console.log('Intercorrência não encontrada ou não associada à pessoa\n');
      return res.status(404).send({ message: 'Intercorrência não encontrada ou não associada à pessoa' });
    }

    // Atualize os valores da intercorrência com os valores do corpo da solicitação
    intercorrencia.name = name;
    intercorrencia.position = position;

    // Salve a intercorrência atualizada no banco de dados
    await intercorrencia.save();

    console.log('Intercorrência atualizada com sucesso\n');
    return res.status(201).send({ message: 'Intercorrência atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar a intercorrência:', error, '\n');
    return res.status(500).send({ error: 'Erro ao atualizar a intercorrência' });
  }
};
// Excluir uma intercorrência específica de uma pessoa por ID - DELETE
const removeIntercorrencia = async (req, res) => {
  const { personId, intercorrenciaId } = req.params;

  try {
    // Verificar se a pessoa e a intercorrência existem e estão associadas
    const pessoa = await Person.findByPk(personId, {
      include: {
        model: Intercorrencia,
        where: { id: intercorrenciaId },
        attributes: ['id'], // Selecionar apenas o ID da intercorrência
      },
      attributes: ['id'], // Selecionar apenas o ID da pessoa
    });

    if (!pessoa || !pessoa.intercorrencias || pessoa.intercorrencias.length === 0) {
      console.log('Pessoa ou intercorrência não encontrada ou não associada\n');
      return res.status(404).send({ message: 'Pessoa ou intercorrência não encontrada ou não associada' });
    }

    // Remover a associação entre a pessoa e a intercorrência
    await pessoa.removeIntercorrencia(pessoa.intercorrencias[0]);

    console.log('Intercorrência removida com sucesso\n');
    return res.status(200).send({ message: 'Intercorrência removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover a intercorrência:', error, '\n');
    return res.status(500).send({ error: 'Erro ao remover a intercorrência' });
  }
};
module.exports = {
  createIntercorrencia,
  listIntercorrencia,
  viewIntercorrencia,
  updateIntercorrencia,
  removeIntercorrencia
};

const { Person } = require('../models/person');
const Intercorrencia = require('../models/intercorrencia').Intercorrencia;

// Criar uma nova prescrição para uma pessoa - POST
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
      const novaIntercorrencia = await Intercorrencia.create({
        personId,
        name,
        position
      });
  
      await pessoa.addIntercorrencia(novaIntercorrencia);
  
      console.log('Intercorrência criada com sucesso\n');
      return res.status(201).send({ message: 'Intercorrência criada com sucesso' });
    } catch (error) {
      console.error('Erro ao criar a intercorrência:', error, '\n');
      return res.status(500).send({ error: 'Erro ao criar a intercorrência' });
    }
};
// Listar todas as prescrições de uma pessoa - GET
const listIntercorrencia = async (req, res) => {
  const { personId } = req.params;

  try {
    const pessoa = await Person.findByPk(personId);
    if (!pessoa) {
      console.log('Pessoa não encontrada\n');
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }
    const intercorrencia = await pessoa.intercorrencia({
      where: { personId },
      order: [['position', 'ASC']]
    });
    
    console.log('A visualizar as intercorrências da pessoa:', personId, '\n');
    return res.json(intercorrencia);
  } catch (error) {
    console.error('Erro ao listar as intercorrências:', error, '\n');
    return res.status(500).send({ error: 'Erro ao listar as intercorrências' });
  }
};
// Obter uma prescrição específico de uma pessoa por ID - GET
const viewIntercorrencia = async (req, res) => {
    const { personId, intercorrenciaId } = req.params;
  
    try {
      const pessoa = await Person.findByPk(personId);
      if (!pessoa) {
        console.log('Pessoa não encontrada\n');
        return res.status(404).send({ message: 'Pessoa não encontrada' });
      }
  
      const intercorrencia = await Intercorrencia.findOne({
        where: { id: intercorrenciaId, personId }
      });
  
      if (intercorrencia) {
        console.log('A visualizar a intercorrência:', intercorrenciaId, '\n');
        return res.json(intercorrencia,);
      } else {
        console.log('Intercorrência não encontrada\n');
        return res.status(404).send({ message: 'Intercorrência não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao obter a intercorrência:', error, '\n');
      return res.status(500).send({ error: 'Erro ao obter a intercorrência' });
    }
};
// Atualizar uma prescrição específico de uma pessoa por ID - PUT
const updateIntercorrencia = async (req, res) => {
    const { personId, intercorrenciaId } = req.params;
    const { name, position } = req.body;
  
    try {
      const pessoa = await Person.findByPk(personId);
      if (!pessoa) {
        console.log('Pessoa não encontrada\n');
        return res.status(404).send({ message: 'Pessoa não encontrada' });
      }
      console.log('A atulizar a intercorrência:', intercorrenciaId);
      const intercorrencia = await Intercorrencia.findOne({
        where: { id: intercorrenciaId, personId }
        
      });
  
      if (intercorrencia) {
        intercorrencia.name = name;
        intercorrencia.position = position;
  
        await intercorrencia.save();
        console.log('Intercorrência atualizada com sucesso\n');
        return res.status(201).send({ message: 'Intercorrência atualizada com sucesso' });
      } else {
        console.log('Intercorrência não encontrada\n');
        return res.status(404).send({ message: 'Intercorrência não encontrada' });
      }
    } catch (error) {
      console.error('Erro a atualizar a intercorrência:', error, '\n');
      return res.status(500).send({ error: 'Erro a atualizar a intercorrência' });
    }
};
// Excluir uma prescrição específico de uma pessoa por ID - DELETE
const removeIntercorrencia = async (req, res) => {
    const { personId, intercorrenciaId } = req.params;
  
    try {
      const pessoa = await Person.findByPk(personId);
      if (!pessoa) {
        console.log('Pessoa não encontrada\n');
        return res.status(404).send({ message: 'Pessoa não encontrada' });
      }
      console.log('A eliminar a intercorrência:', intercorrenciaId);
      const intercorrencia = await Intercorrencia.findOne({
        where: { id: intercorrenciaId, personId }
      });
  
      if (intercorrencia) {
        await intercorrencia.destroy();
        console.log('Intercorrência excluída com sucesso\n');
        return res.send({ message: 'Intercorrência excluída com sucesso' });
      } else {
        console.log('Intercorrência não encontrada\n');
        return res.status(404).send({ message: 'Intercorrência não encontrada\n' });
      }
    } catch (error) {
      console.error('Erro ao excluir a intercorrência:', error, '\n');
      return res.status(500).send({ error: 'Erro ao excluir a intercorrência' });
    }
};
module.exports = {
    createIntercorrencia,
    listIntercorrencia,
    viewIntercorrencia,
    updateIntercorrencia,
    removeIntercorrencia
};


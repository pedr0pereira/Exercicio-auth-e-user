const { Person } = require('../models/person');
const Medication = require('../models/medication').Medication;

// Criar uma nova prescrição para uma pessoa - POST
const createMedicationPrescription = async (req, res) => {
    const { personId } = req.params;
    const { nome, dosagem, frequencia } = req.body;
  
    try {
      const pessoa = await Person.findByPk(personId);
      if (!pessoa) {
        console.log('Pessoa não encontrada\n');
        return res.status(404).send({ message: 'Pessoa não encontrada' });
      }
      console.log('A criar uma nova prescrição para a pessoa:', personId);
      const novaPrescricao = await Medication.create({
        personId,
        nome,
        dosagem,
        frequencia
      });
  
      console.log('Prescrição criada com sucesso\n');
      return res.status(201).send({ message: 'Prescrição criada com sucesso' });
    } catch (error) {
      console.error('Erro ao criar a prescrição:', error, '\n');
      return res.status(500).send({ error: 'Erro ao criar a prescrição' });
    }
};
// Listar todas as prescrições de uma pessoa - GET
const listMedicationPrescription = async (req, res) => {
    const { personId } = req.params;
  
    try {
      const pessoa = await Person.findByPk(personId);
      if (!pessoa) {
        console.log('Pessoa não encontrada\n');
        return res.status(404).send({ message: 'Pessoa não encontrada' });
      }
      const prescricoes = await Medication.findAll({
        where: { personId }
      });
      console.log('A visualizar as prescrições da pessoa:', personId, '\n');
      return res.json(prescricoes);
    } catch (error) {
      console.error('Erro a listar as prescrições:', error, '\n');
      return res.status(500).send({ error: 'Erro a listar as prescrições' });
    }
};
// Obter uma prescrição específico de uma pessoa por ID - GET
const viewMedicationPrescription = async (req, res) => {
    const { personId, prescricaoId } = req.params;
  
    try {
      const pessoa = await Person.findByPk(personId);
      if (!pessoa) {
        console.log('Pessoa não encontrada\n');
        return res.status(404).send({ message: 'Pessoa não encontrada' });
      }
  
      const prescricao = await Medication.findOne({
        where: { id: prescricaoId, personId }
      });
  
      if (prescricao) {
        console.log('A visualizar a prescrição:', prescricaoId, '\n');
        return res.json(prescricao,);
      } else {
        console.log('Prescrição não encontrada\n');
        return res.status(404).send({ message: 'Prescrição não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao obter a prescrição:', error, '\n');
      return res.status(500).send({ error: 'Erro ao obter a prescrição' });
    }
};
// Atualizar uma prescrição específico de uma pessoa por ID - PUT
const updateMedicationPrescription = async (req, res) => {
    const { personId, prescricaoId } = req.params;
    const { nome, dosagem, frequencia } = req.body;
  
    try {
      const pessoa = await Person.findByPk(personId);
      if (!pessoa) {
        console.log('Pessoa não encontrada\n');
        return res.status(404).send({ message: 'Pessoa não encontrada' });
      }
      console.log('A atulizar a prescrição:', prescricaoId);
      const prescricao = await Medication.findOne({
        where: { id: prescricaoId, personId }
        
      });
  
      if (prescricao) {
        prescricao.nome = nome;
        prescricao.dosagem = dosagem;
        prescricao.frequencia = frequencia;
  
        await prescricao.save();
        console.log('Prescrição atualizada com sucesso\n');
        return res.status(201).send({ message: 'Prescrição atualizada com sucesso' });
      } else {
        console.log('Prescrição não encontrada\n');
        return res.status(404).send({ message: 'Prescrição não encontrada' });
      }
    } catch (error) {
      console.error('Erro a atualizar a prescrição:', error, '\n');
      return res.status(500).send({ error: 'Erro a atualizar a prescrição' });
    }
};
// Excluir uma prescrição específico de uma pessoa por ID - DELETE
const removeMedicationPrescription = async (req, res) => {
    const { personId, prescricaoId } = req.params;
  
    try {
      const pessoa = await Person.findByPk(personId);
      if (!pessoa) {
        console.log('Pessoa não encontrada\n');
        return res.status(404).send({ message: 'Pessoa não encontrada' });
      }
      console.log('A eliminar a prescrição:', prescricaoId);
      const prescricao = await Medication.findOne({
        where: { id: prescricaoId, personId }
      });
  
      if (prescricao) {
        await prescricao.destroy();
        console.log('Prescrição excluída com sucesso\n');
        return res.send({ message: 'Prescrição excluída com sucesso' });
      } else {
        console.log('Prescrição não encontrada\n');
        return res.status(404).send({ message: 'Prescrição não encontrada\n' });
      }
    } catch (error) {
      console.error('Erro ao excluir a prescrição:', error, '\n');
      return res.status(500).send({ error: 'Erro ao excluir a prescrição' });
    }
};
module.exports = {
    createMedicationPrescription,
    listMedicationPrescription,
    viewMedicationPrescription,
    updateMedicationPrescription,
    removeMedicationPrescription
};


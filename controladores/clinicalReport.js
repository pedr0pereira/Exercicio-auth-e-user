const { Person } = require('../models/person');
const ClinicalReport = require('../models/clinicalReport').ClinicalReport;

// Criar um novo relatório clínico para uma pessoa - POST
const createClinicalReport = async (req, res) => {
  const { personId } = req.params;
  const { queixaPrincipal, historiaDoencaAtual, antecedentesPessoais, historicoFamiliar, aparelhoRespiratorio, aparelhoCardiovascular, aparelhoGastrointestinal, aparelhoGenitoUrinario, sistemaNervosoCentral, membrosInferiores, problemasAtivos, problemasPassivos } = req.body;

  try {
    const pessoa = await Person.findByPk(personId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }
    console.log('\nA criar um novo relatório para a pessoa:', personId);
    const novoRelatorio = await ClinicalReport.create({
      personId,
      queixaPrincipal,
      historiaDoencaAtual,
      antecedentesPessoais,
      historicoFamiliar,
      aparelhoRespiratorio,
      aparelhoCardiovascular,
      aparelhoGastrointestinal,
      aparelhoGenitoUrinario,
      sistemaNervosoCentral,
      membrosInferiores,
      problemasAtivos,
      problemasPassivos
    });

    console.log('Relatório clínico criado com sucesso');
    return res.status(201).send({ message: 'Relatório clínico criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar relatório clínico:', error);
    return res.status(500).send({ error: 'Erro ao criar relatório clínico' });
  }
};
// Listar todos os relatórios clínicos de uma pessoa - GET
const listClinicalReports = async (req, res) => {
  const { personId } = req.params;

  try {
    const pessoa = await Person.findByPk(personId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }
    console.log('\nA listar todos os relatórios da pessoa:', personId);
    const relatorios = await ClinicalReport.findAll({
      where: { personId }
    });

    return res.json(relatorios);
  } catch (error) {
    console.error('Erro a listar relatórios clínicos:', error);
    return res.status(500).send({ error: 'Erro a listar relatórios clínicos' });
  }
};
// Obter um relatório clínico específico de uma pessoa por ID - GET
const viewClinicalReport = async (req, res) => {
  const { personId, relatorioId } = req.params;

  try {
    const pessoa = await Person.findByPk(personId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }

    const relatorio = await ClinicalReport.findOne({
      where: { id: relatorioId, personId }
    });

    if (relatorio) {
      console.log('\nA visualizar o relatório clínico:', relatorioId);
      return res.json(relatorio);
    } else {
      return res.status(404).send({ message: 'Relatório clínico não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter relatório clínico:', error);
    return res.status(500).send({ error: 'Erro ao obter relatório clínico' });
  }
};
// Atualizar um relatório clínico específico de uma pessoa por ID - PUT
const updateClinicalReport = async (req, res) => {
  const { personId, relatorioId } = req.params;
  const { queixaPrincipal, historiaDoencaAtual, antecedentesPessoais, historicoFamiliar, aparelhoRespiratorio, aparelhoCardiovascular, aparelhoGastrointestinal, aparelhoGenitoUrinario, sistemaNervosoCentral, membrosInferiores, problemasAtivos, problemasPassivos } = req.body;

  try {
    const pessoa = await Person.findByPk(personId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }
    console.log('\nA atulizar o relatório:', relatorioId);
    const relatorio = await ClinicalReport.findOne({
      where: { id: relatorioId, personId }
      
    });

    if (relatorio) {
      relatorio.queixaPrincipal = queixaPrincipal;
      relatorio.historiaDoencaAtual = historiaDoencaAtual;
      relatorio.antecedentesPessoais = antecedentesPessoais;
      relatorio.historicoFamiliar = historicoFamiliar;
      relatorio.aparelhoRespiratorio = aparelhoRespiratorio;
      relatorio.aparelhoCardiovascular = aparelhoCardiovascular;
      relatorio.aparelhoGastrointestinal = aparelhoGastrointestinal;
      relatorio.aparelhoGenitoUrinario = aparelhoGenitoUrinario;
      relatorio.sistemaNervosoCentral = sistemaNervosoCentral;
      relatorio.membrosInferiores = membrosInferiores;
      relatorio.problemasAtivos = problemasAtivos;
      relatorio.problemasPassivos = problemasPassivos;

      await relatorio.save();
      console.log('Relatório clínico atualizado com sucesso');
      return res.status(201).send({ message: 'Relatório clínico atualizado com sucesso' });
    } else {
      return res.status(404).send({ message: 'Relatório clínico não encontrado' });
    }
  } catch (error) {
    console.error('Erro a atualizar relatório clínico:', error);
    return res.status(500).send({ error: 'Erro a atualizar relatório clínico' });
  }
};
// Excluir um relatório clínico específico de uma pessoa por ID - DELETE
const removeClinicalReport = async (req, res) => {
  const { personId, relatorioId } = req.params;

  try {
    const pessoa = await Person.findByPk(personId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada' });
    }
    console.log('\nA eliminar o relatório:', relatorioId);
    const relatorio = await ClinicalReport.findOne({
      where: { id: relatorioId, personId }
    });

    if (relatorio) {
      await relatorio.destroy();
      return res.send({ message: 'Relatório clínico excluído com sucesso' });
    } else {
      return res.status(404).send({ message: 'Relatório clínico não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir relatório clínico:', error);
    return res.status(500).send({ error: 'Erro ao excluir relatório clínico' });
  }
};
module.exports = {
    createClinicalReport,
    listClinicalReports,
    viewClinicalReport,
    updateClinicalReport,
    removeClinicalReport
};

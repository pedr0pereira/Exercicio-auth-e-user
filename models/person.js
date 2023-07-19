const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const ClinicalReport = require('./clinicalReport').ClinicalReport;
const Medication = require('./medication').Medication;
const Intercorrencia = require('./intercorrencia').Intercorrencia;


const Person = sequelize.define(
  'Person',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apelido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    morada: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    profissao: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'person',
    timestamps: false
  }
);
// Defina as associações aqui
Person.hasMany(ClinicalReport, {
  foreignKey: "personId",
  as: "clinicalReport",
});
Person.hasMany(Medication, {
  foreignKey: "personId",
  as: "medicationPrescription",
});
// Defina as associações de muitos-para-muitos
Person.belongsToMany(Intercorrencia, {
  through: 'intercorrenciaPerson',
  foreignKey: 'personId',
  otherKey: 'intercorrenciaId',
  timestamps: false,
});

// Função para obter todas as intercorrências associadas a uma pessoa
Person.prototype.getIntercorrencias = async function () {
  try {
    const intercorrencias = await this.getIntercorrencia(); // Usar o nome correto da função gerada automaticamente pelo Sequelize

    return intercorrencias;
  } catch (error) {
    throw new Error('Erro ao obter as intercorrências da pessoa: ' + error.message);
  }
};

// Exporte o modelo Person corretamente
module.exports = { Person };

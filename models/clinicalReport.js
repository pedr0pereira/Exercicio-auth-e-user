const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const { Person } = require('./person');

const ClinicalReport = sequelize.define(
  'ClinicalReport',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    queixaPrincipal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    historiaDoencaAtual: {
      type: DataTypes.STRING,
      allowNull: false
    },
    antecedentesPessoais: {
      type: DataTypes.STRING,
      allowNull: true
    },
    historicoFamiliar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aparelhoRespiratorio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aparelhoCardiovascular: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aparelhoGastrointestinal: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aparelhoGenitoUrinario: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sistemaNervosoCentral: {
      type: DataTypes.STRING,
      allowNull: true
    },
    membrosInferiores: {
      type: DataTypes.STRING,
      allowNull: true
    },
    problemasAtivos: {
      type: DataTypes.STRING,
      allowNull: true
    },
    problemasPassivos: {
      type: DataTypes.STRING,
      allowNull: true
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'person', key: 'id' }
    }
  },
  {
    tableName: 'clinical_reports',
    timestamps: false
  }
);

module.exports = { ClinicalReport };

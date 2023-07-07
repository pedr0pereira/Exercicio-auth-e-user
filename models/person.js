const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Person = sequelize.define(
    'Person',
    {
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
  
  module.exports = { Person };
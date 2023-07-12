const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const { Intercorrencia } = require('./intercorrencia');

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
Person.belongsToMany(Intercorrencia, {
  through: "intercorrenciaPerson",
  foreignKey: 'personId',
});

module.exports = { Person };

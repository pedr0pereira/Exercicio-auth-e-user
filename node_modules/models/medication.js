const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Medication = sequelize.define(
  'Medication',
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
    dosagem: {
      type: DataTypes.STRING,
      allowNull: false
    },
    frequencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'person', key: 'id' }
    }
  },
  {
    tableName: 'medicationPrescription',
    timestamps: false
  },{
    classMethods: {
      associate: function (models) {
        Medication.belongsTo(Person, {
          foreignKey: 'personId',
          as: 'person',
        });
      }
    }
  }
);

module.exports = { Medication };

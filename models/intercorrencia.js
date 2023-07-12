const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const { Person } = require('./person');

const Intercorrencia = sequelize.define(
    'Intercorrencia',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'intercorrencia',
        timestamps: false
    }
);
Intercorrencia.belongsToMany(Person, {
    through: "intercorrenciaPerson",
    foreignKey: 'intercorrenciaId',
});
module.exports = { Intercorrencia };

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

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
    },{
        classMethods: {
            associate: function (models) {
                Intercorrencia.belongsToMany(Person, {
                through: 'intercorrenciaPerson',
                foreignKey: 'intercorrenciaId',
                otherKey: 'personId',
                timestamps: false,
                });
            }
        }
      }
    );
module.exports = { Intercorrencia };

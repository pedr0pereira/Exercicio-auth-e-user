const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const VascularAcess = sequelize.define(
    'VascularAcess',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        observacoes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'acessosVasculares',
        timestamps: false
    },{
        classMethods: {
            associate: function (models) {
                VascularAcess.belongsToMany(Person, {
                through: 'acessosVascularesPerson',
                foreignKey: 'acessosVascularesId',
                otherKey: 'personId',
                timestamps: false,
                });
            }
        }
      }
    );
module.exports = { VascularAcess };

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const OpcaoDeProduto = sequelize.define('opcaoDeProdutos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id'
        }

    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    shape:{
        type: DataTypes.ENUM('square', 'circle'),
        allowNull: true,
        defaultValue: 'square'
    },
    radius: {
        type: DataTypes.INTEGER('border-radius'),
        allowNull: true,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        allowNull: true,
        defaultValue: 'text'
    },
    values: {
        type: DataTypes.STRING,
        allowNull: 0
    }
});

module.exports = OpcaoDeProduto;
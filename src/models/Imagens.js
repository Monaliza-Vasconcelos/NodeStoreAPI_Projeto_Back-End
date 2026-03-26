const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Imagem = sequelize.define('imagens',{
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
    enabled:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Imagem;
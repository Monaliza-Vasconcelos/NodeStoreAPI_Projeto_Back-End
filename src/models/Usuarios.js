const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Usuario = sequelize.define('Usuarios',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false

    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},      
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'   

});



module.exports = Usuario;
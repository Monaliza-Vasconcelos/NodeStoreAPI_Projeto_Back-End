const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const ProdutoCategoria = sequelize.define('produto_categoria', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produtos',
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categorias',
      key: 'id'
    }
  }
});

module.exports = ProdutoCategoria;
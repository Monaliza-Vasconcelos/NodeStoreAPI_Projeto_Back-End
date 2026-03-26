const Categoria = require("./Categorias");
const Imagem = require("./Imagens");
const Produto = require("./Produtos");
const ProdutoCategoria = require("./ProdutosCategoria");
const OpcaoDeProduto = require("./OpcaoDeProdutos"); // importando o modelo de opções

// -----------------------
// RELACIONAMENTOS
// -----------------------

// Produto → Imagens (1:N)
Produto.hasMany(Imagem, {
    foreignKey: 'product_id',
    as: 'images'
});
Imagem.belongsTo(Produto, {
    foreignKey: 'product_id',
    as: 'product'
});

// Produto → Opções (1:N)
Produto.hasMany(OpcaoDeProduto, {
    foreignKey: 'product_id',
    as: 'options' // alias que precisa bater com o controller
});
OpcaoDeProduto.belongsTo(Produto, {
    foreignKey: 'product_id',
    as: 'product'
});

// Produto ↔ Categoria (N:N)
Produto.belongsToMany(Categoria, {
    through: ProdutoCategoria,
    foreignKey: 'product_id',
    as: 'categories'
});
Categoria.belongsToMany(Produto, {
    through: ProdutoCategoria,
    foreignKey: 'category_id',
    as: 'products'
});

// -----------------------
// EXPORTS
// -----------------------
module.exports = { 
    Produto, 
    Imagem,
    Categoria,
    ProdutoCategoria,
    OpcaoDeProduto
};
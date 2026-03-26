const app = require('./app');
const sequelize = require('./config/database');

require('./models/Usuarios');
require('./models/Categorias');
require('./models/Produtos');
require('./models/Imagens');
require('./models/OpcaoDeProdutos')
require('./models/ProdutosCategoria')

sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado!');

    app.listen(3000, () => {
      console.log('Servidor rodando');
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar:', err);
  });
const { Op } = require('sequelize');
const { Produto, Imagem, Categoria, OpcaoDeProduto } = require('../models');

class ProdutosController {
    async search(req, res) {
        try {
            const {
                limit = 12,
                page = 1,
                fields,
                match,
                category_ids,
                'price-range': priceRange,
                ...optionsQuery
            } = req.query;

            const parsedLimit = parseInt(limit);
            const parsedPage = parseInt(page);

            if (isNaN(parsedLimit) || isNaN(parsedPage) || parsedLimit < -1 || parsedPage < 1) {
                return res.status(400).json({ message: "Parâmetros inválidos" });
            }

            const where = {};

            // filtro por match (nome ou descrição)
            if (match) {
                where[Op.or] = [
                    { name: { [Op.iLike]: `%${match}%` } }, // PostgreSQL
                    { description: { [Op.iLike]: `%${match}%` } }
                ];
            }

            // filtro por faixa de preço
            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                if (!isNaN(min) && !isNaN(max)) {
                    where.price = { [Op.between]: [min, max] };
                }
            }

            // filtro por opções (option[ID]=VALORES)
            const optionFilters = Object.keys(optionsQuery)
                .filter(key => key.startsWith('option['))
                .map(key => {
                    const optionId = key.match(/\d+/)[0];
                    const values = optionsQuery[key].split(',');
                    return { optionId, values };
                });

            const options = { where };

            // campos específicos
            if (fields) {
                options.attributes = fields.split(',');
            }

            // paginação
            if (parsedLimit !== -1) {
                options.limit = parsedLimit;
                options.offset = (parsedPage - 1) * parsedLimit;
            }

            // relacionamentos (usar alias correto)
            options.include = [
                {
                    model: Imagem,
                    as: 'images', // ✅ alias correto
                    attributes: ['id', ['path', 'content']]
                },
                {
                    model: OpcaoDeProduto,
                    as: 'options', // ✅ alias correto
                    attributes: ['id', 'title', 'type', 'values']
                },
                {
                    model: Categoria,
                    as: 'categories', // ✅ alias correto
                    attributes: ['id'],
                    through: { attributes: [] }
                }
            ];

            // filtro por category_ids
            if (category_ids) {
                const categoriesArray = category_ids.split(',').map(id => parseInt(id));
                options.include.push({
                    model: Categoria,
                    as: 'categories', // ✅ alias correto
                    attributes: [],
                    through: { attributes: [] },
                    where: { id: { [Op.in]: categoriesArray } }
                });
            }

            const { count, rows } = await Produto.findAndCountAll(options);

            // transformar categories em category_ids simples
            const data = rows.map(produto => ({
                ...produto.toJSON(),
                category_ids: produto.categories ? produto.categories.map(cat => cat.id) : []
            }));

            return res.status(200).json({
                data,
                total: count,
                limit: parsedLimit,
                page: parsedLimit === -1 ? 1 : parsedPage
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async buscarPorId(req, res) {
        const { id } = req.params;

        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({
                message: "Produto não existe"
            })
        }

        return res.status(200).json({
            id: produto.id,
            enabled: produto.enabled,
            name: produto.name,
            slug: produto.slug,
            stock: produto.stock,
            description: produto.description,
            price: produto.price,
            price_with_discount: produto.price_with_discount,
            category_ids: produto.category_ids,
            images: produto.images,
            options: produto.options
        })
    }

    async create(req, res) {
        try {
            const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            if (typeof !enabled !== 'boolean' || !name || !slug || !stock || !description || !price || !price_with_discount || !category_ids || !images || !options) {
                return res.status(400).json({ message: 'Dados incorretos' });
            }

            const produto = await Produto.create({
                enabled,
                name,
                slug,
                stock,
                description,
                price,
                price_with_discount,
                category_ids,
                images,
                options

            });

            return res.status(201).json({
                id: produto.id,
                enabled: produto.enabled,
                name: produto.name,
                slug: produto.slug,
                stock: produto.stock,
                description: produto.description,
                price: produto.price,
                price_with_discount: produto.price_with_discount,
                category_ids: produto.category_ids,
                images: produto.images,
                options: produto.options
            });

        } catch (error) {
            console.error('ERRO COMPLETO:', error);
            return res.status(500).json({ message: 'Erro ao criar categoria' });
        }
    }

    async upadate(req, res) {
        try {
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            const { id } = req.params;
            const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;

            if (
                typeof enabled !== 'boolean' ||
                !name ||
                !slug ||
                stock === undefined ||
                !description ||
                price === undefined ||
                price_with_discount === undefined ||
                !Array.isArray(category_ids) ||
                !Array.isArray(images) ||
                !Array.isArray(options)
            ) {
                return res.status(400).json({ message: 'Dados incorretos' });
            }

            const produto = await Produto.findByPk(id);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            await produto.update({
                enabled,
                name,
                slug,
                stock,
                description,
                price,
                price_with_discount,
                category_ids,
                images,
                options
            });

            return res.status(204).send();

        } catch (error) {
            console.log(error);

            return res.status(400).json({ message: 'Erro ao atualizar produto' });
        }
    }
    async delete(req,res){
         try {
            const token = req.headers.authorization;
            if(!token){
                return res.status(401).json({
                    message: "token não informado"
                })
            }

            const { id } = req.params;
            const produto = await Produto.findByPk(id);
            if(!produto){
                return res.status(401).json({ message: 'produto não encontrada' });
            } else{
                produto.destroy()
                return res.status(204).send();
            }

        } catch (error) {
            return res.status(404).json({ message: 'Erro ao deletar produto' });
        }
    }
}

module.exports = ProdutosController;
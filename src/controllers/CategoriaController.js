
const { Categoria } = require('../models');
class CategoriaController {

    async search(req, res) {
        const { limit, page, fields, use_in_menu } = req.query;

        const parsedLimit = limit ? parseInt(limit) : 12;
        const parsedPage = page ? parseInt(page) : 1;

        if (isNaN(parsedLimit) || isNaN(parsedPage) || parsedLimit < -1 || parsedPage < 1) {
            return res.status(400).json({ message: "Parâmetros inválidos" });
        }

        const where = {};

        if (use_in_menu !== undefined) {
            where.use_in_menu = use_in_menu === 'true';
        }

        let options = {
            where
        };

        if (fields) {
            options.attributes = fields.split(',');
        }

        if (parsedLimit !== -1) {
            options.limit = parsedLimit;
            options.offset = (parsedPage - 1) * parsedLimit;
        }

        const { count, rows } = await Categoria.findAndCountAll(options);

        return res.status(200).json({
            data: rows,
            total: count,
            limit: parsedLimit,
            page: parsedLimit === -1 ? 1 : parsedPage
        });
    }

    async buscarPorId(req, res) {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({
                message: "Categoria não existe"
            })
        }

        return res.status(200).json({
            id: categoria.id,
            name: categoria.name,
            slug: categoria.slug,
            use_in_menu: categoria.use_in_menu
        })
    }
    async create(req, res) {
        try {
            const { name, slug, use_in_menu } = req.body;
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            if (!name || !slug || typeof use_in_menu !== 'boolean') {
                return res.status(400).json({ message: 'Dados incorretos' });
            }

            const categoria = await Categoria.create({
                name,
                slug,
                use_in_menu
            });

            return res.status(201).json({
                id: categoria.id,
                name: categoria.name,
                slug: categoria.slug,
                use_in_menu: categoria.use_in_menu
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
            const { name, slug, use_in_menu } = req.body;

            if (!name || !slug || !use_in_menu) {
                return res.status(400).json({ message: 'Dados incorretos' });
            }

            const categoria = await Categoria.findByPk(id);

            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrado' });
            }

            await categoria.update({
                name,
                slug,
                use_in_menu
            });

            return res.status(204).send();

        } catch (error) {
            console.log(error);

            return res.status(400).json({ message: 'Erro ao atualizar caregoria' });
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
            const categoria = await Categoria.findByPk(id);
            if(!categoria){
                return res.status(401).json({ message: 'categoria não encontrada' });
            } else{
                categoria.destroy()
                return res.status(204).send();
            }

        } catch (error) {
            return res.status(404).json({ message: 'Erro ao deletar categoria' });
        }
    }


}

module.exports = CategoriaController;
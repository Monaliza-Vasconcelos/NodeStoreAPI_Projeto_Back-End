const Usuario = require("../models/Usuarios");
const bcrypt = require('bcrypt');

class UserController {
    async buscarPorId(req, res) {
        const { id } = req.params;

        const user = await Usuario.findByPk(id);

        if (!user) {
            return res.status(400).json({
                message: "Usuário não identificado!"
            })
        }

        return res.status(201).json({
            id: user.id,
            firstname: user.firstname,
            surname: user.surname,
            email: user.email
        })
    }

    async create(req, res) {
        try {
            const { firstname, surname, email, password, confirmPassword } = req.body;

            if (!firstname || !surname || !email || !password || !confirmPassword) {
                return res.status(400).json({ message: 'Campos ausentes' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'As senhas não coincidem.' });
            }

            // 🔐 AQUI é a correção principal
            const senhaHash = await bcrypt.hash(password, 10);

            const user = await Usuario.create({
                firstname,
                surname,
                email,
                password: senhaHash // 👈 salva o hash, não a senha pura
            });

            return res.status(201).json(user);

        } catch (error) {
            console.log('ERRO COMPLETO:', error);
            return res.status(400).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            const { id } = req.params;
            const { firstname, surname, email } = req.body;

            if (!firstname || !surname || !email) {
                return res.status(400).json({ message: 'Dados inválidos' });
            }

            const user = await Usuario.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await user.update({
                firstname,
                surname,
                email
            });

            return res.status(204).send();

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao atualizar usuário' });
        }
    }
    async delete(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    message: "token não informado"
                })
            }

            const { id } = req.params;
            const user = await Usuario.findByPk(id);
            if (!user) {
                return res.status(401).json({ message: 'Usuário não encontrado' });
            } else {
                user.destroy()
                return res.status(204).send();
            }

        } catch (error) {
            return res.status(404).json({ message: 'Erro ao deletar usuário' });
        }
    }
}

module.exports = UserController;
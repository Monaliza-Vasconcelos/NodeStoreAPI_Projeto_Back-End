const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuarios'); 

class AuthController {
    async token(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Dados incorretos" });
            }
            const user = await Usuario.findOne({ where: { email } });

            if (!user) {
                console.log(user);
                
                return res.status(400).json({ message: "Email ou senha inválidos" });
            }

            const senhaValida = await bcrypt.compare(password, user.password);

            if (!senhaValida) {
                console.log(senhaValida);
                
                return res.status(400).json({ message: "Email ou senha inválidos" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            

            return res.status(200).json({ token });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

module.exports = AuthController;
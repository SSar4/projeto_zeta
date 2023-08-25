const UsuarioEntity = require('../entities/usuarios');

class UserRespository {
    constructor(conn) {
        this.conn = conn;
    }

    async login({ email }) {
        const user = await this.conn.findOne({ where: { email } });
        if(!user) return
        return new UsuarioEntity({
            id: user.id, 
            nome: user.nome, 
            email: user.email, 
            senha: user.senha, 
            permissao: user.permissao,
            created: user.created_at,
            updated: user.updated_at
        });
    }

    async cadastrar({ nome, email, senha, permissao }) {
        const user = await this.conn.create({ nome, email, senha, permissao })
        return  new UsuarioEntity({
             id: user.id, 
             nome: user.nome, 
             email: user.email, 
             senha: user.senha, 
             permissao: user.permissao,
             created: user.created_at,
             updated: user.updated_at
            })
    }
}

module.exports = UserRespository;
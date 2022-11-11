var db = require('./Conn');
var notificacoes = require('./Notifications');
var produtos = require('./Products');
module.exports = class  {
    static async getInteressesForUser(id){
        return await db.query('SELECT * FROM interesses WHERE user_id = ?', [id]);
    }

    static async addInteressesForUser(userid, produto =0, departamento=0,loja =0){
        //verifica se ja nao existe
        var result = await db.query('SELECT * FROM interesses WHERE user_id = ? AND produto = ? AND departamento = ? AND loja = ?', [userid, produto, departamento, loja]);
        if(result.length == 0) {
            return await db.query('INSERT INTO interesses (user_id, produto, departamento, loja) VALUES (?, ?, ?, ?)', [userid, produto, departamento, loja]);
            if(produto){
                var prod = await produtos.getProductById(produto);
                var msg = "Vimos que você está de olho no " + prod[0].name + " !";
                var link = "/produto/" + produto;
                notificacoes.addNotificationUser(userid, msg, link);
            }
        }else{
            return await db.query('UPDATE interesses SET timestamp = CURRENT_TIMESTAMP WHERE user_id = ? AND produto = ? AND departamento = ? AND loja = ?', [userid, produto, departamento, loja]);
        }
    }

};